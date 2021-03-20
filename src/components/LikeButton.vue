<template>
    <div @click="likeStory()" class="story-likes button">{{likes}} <icon-base :class={liked} name="heart" /></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default {
    name: "LikeButton",
    props : {
        likeskey: String
    },
    data() {
        return {
            liked: false,
            likes: 0,
            likesref: null,
            likeref: null
        }
    },
    created() {
        this.init();
    },
    methods: {
        likeStory() {
            this.likeref.set(!this.liked);
        },
        removeListeners() {
            this.likesref.off('value');
            this.likeref.off('value');
        },
        init() {
            this.likesref = firebase.database().ref('likes/'+this.likeskey);
            this.likesref.on('value', (snapshot) => {
                this.likes = 0;

                if(!snapshot.exists()) {
                    return;
                }

                snapshot.forEach((like) => {
                    if(like.val() !== false) {
                        this.likes += 1;
                    }
                });
            });
            this.likeref = firebase.database().ref('likes/'+this.likeskey+"/"+this.$root.$data.user.uid);
            this.likeref.on('value', (snapshot) => {
                if(!snapshot.exists()) {
                    this.liked = false;
                }
                else {
                    this.liked = snapshot.val();
                }
            })
        }
    },
    watch: {
        likeskey() {
            this.removeListeners();
            this.init();
        }
    }
}
</script>

<style scoped>

    .vue-feather {
        fill: rgba(255,255,255, 0) !important;
        transition: fill 0.25s, color 0.25s;
    }

    .button:hover .vue-feather:not(.liked) {
        fill: var(--color-2) !important;
    }

    .liked {
        fill: var(--color-2) !important;
    }

</style>
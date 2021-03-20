<template>
    <div class="container">
        <div class="story-view-wrapper">
            <div class="controls">
                <button title="Load a random story." @click="getNextStory()">Random</button>
            </div>
            <StoryView v-if="$route.params.key||storykey||$route.params.new==='true'" :storyid="$route.params.key||storykey" :createnew="$route.params.new==='true'"/>
            <div v-if="notice" class="notice">{{notice}}</div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import StoryView from '@/components/StoryViewer.vue';

export default {
    name:"ViewStory",
    props: {
        nextStory : {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            storykey: null,
            notice: null,
            readAllMessage: "Wow! It looks like you have already edited all available stories! Wait for someone else to edit a story and then check back."
        }
    },
    components: {
        StoryView
    },
    created() {
        if(this.$route.params.key === null || this.$route.params.key === undefined && this.$route.params.new === 'false') {
            this.getNextStory();
        }
    },
    methods: {
        getNextStory() {
            var nextStoryRef = firebase.database().ref('stories').orderByKey();

            if(this.storykey !== null) {
                console.log(this.storykey);
                nextStoryRef = firebase.database().ref('stories').orderByKey().startAfter(this.storykey);
            }

            nextStoryRef.once('value', (stories) => {

                if(!stories.exists()) {
                    this.notice = this.readAllMessage;    
                    this.storykey = null;
                    return;
                }

                stories.forEach((story) => {
                    let lastLineRef = firebase.database().ref('lines/'+story.key+"/").limitToLast(1);
                    lastLineRef.once('value', (lines) => {
                        if(!lines.exists()) {
                            this.storykey = story.key;
                            console.log(this.storykey);
                            this.notice = null;
                            return;
                        }
                        lines.forEach((line) => {
                            if(this.$root.$data.user.uid !== line.val().user) {
                                this.storykey = story.key;
                                this.notice = null;
                                console.log(this.storykey);
                                return true;
                            }
                        });
                    });

                    if(this.storykey !== null) {
                        return true;
                    }
                });

                if(this.storykey === null) {
                    this.notice = this.readAllMessage;
                }
            });
        }
    }
}
</script>

<style scoped>

.container {
    display: flex;
    place-content: center;
    height: 100%;
    flex: 1;
}

    .story-view-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 1200px;
        width: 100%;
    }

    .notice {
        margin-top: 25px;
        background-color: white;
        border-radius: 2px;
        color: #444;
        padding: 40px;
        font-size: 22px;
    }

    .controls {
        width: 100%;
        display: flex;
        place-content: flex-end;
        padding: 5px;
    }

</style>
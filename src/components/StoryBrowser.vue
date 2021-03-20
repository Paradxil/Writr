<template>
    <div class="story-browser">
        <div class="story" v-for="story in stories" :key="story.key">
            <div class="story-title" @click="editStory(story.key)">{{story.title}}</div>
            <div class="story-footer">
                <div @click="shareStory(story.key)" class="story-share button" title="Share this story.">Share <icon-base name="share-2" /></div>
                <div @click="editStory(story.key)" class="story-edit button" title="Continue this story, write the next line.">Edit <icon-base name="edit-3" /></div>
                <LikeButton :likeskey="story.key+'-s'"/>
            </div>
        </div>
    </div>    
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import LikeButton from "../components/LikeButton.vue";

export default {
    name: "StoryBrowser",
    components: {
        LikeButton
    },
    props: {
        max: {
            type: Number,
            default: 25
        }
    },
    data() {
        return {
            user: this.$root.$data.user,
            database: this.$root.$data.database,
            stories: []
        }
    },
    created() {
        var recentStoriesRef = firebase.database().ref('stories').limitToLast(this.max);
        recentStoriesRef.on('value', (stories) => {
            this.stories = [];
            stories.forEach((story) => {
                let data = story.val();
                data.key = story.key;
                this.stories.push(data);
            });
            this.stories.reverse();
        });
    },
    methods: {
        editStory(key) {
            this.$router.push({ name: 'View', params: { new:false, key: key } })
        }
    }
}
</script>

<style scoped>

    .story-browser {
        display: flex;
        flex-wrap: wrap;
        padding: 0px 2%;
    }

    .story {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 500px;
        min-height: 150px;
        flex: 23%;
        background-color: white;
        color: #444;
        padding: 16px;
        border-radius: 2px;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
        margin: 10px;
    }

    .story-title {
        font-size: 30px;
        text-align: left;
        overflow: hidden;
        flex: 1;
        cursor: pointer;
    }

    .story-footer {
        display: flex;
        align-content: center;
        width: 100%;
        place-content: flex-end;
    }

    .story-lines {
        text-align: left;
        flex:1;
    }

</style>
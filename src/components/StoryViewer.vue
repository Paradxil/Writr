<template>
    <div class="story-view">
        <div class="story-title">
            <input autocomplete="off" :disabled="!canedit" id="story-title" placeholder="Enter title..." v-model="storyTitle" class="invisible-input">
            <LikeButton :likeskey="storykey+'-s'" v-if="$route.params.new!=='true'"/>
        </div>
        <div class="story-lines">
            <div class='story-line' :class="{currentuser: line.user===$root.$data.user.uid}" :title="line.user===$root.$data.user.uid?'You wrote this, yay!':''" v-for="line in lines" :key="line.key">
                <div class="line-text"><p>{{line.text}}</p></div>
                <LikeButton :likeskey="line.key+'-l'"/>
            </div>
            <div v-if="canedit" class="next-line story-line">
                <input autocomplete="off" :disabled="!canedit" type="text" id="next-line" class="invisible-input" v-model="nextLine" placeholder="write next line here.."/>
                <div class="char-count">{{charCount}}/{{maxCharCount}}</div>
                <button class="flat" @click="submitData()">Submit</button>
            </div>
        </div>
        <div v-if="message && message.text" class="message story-line" :class="message.error? 'error' : ''">{{message.text}}</div>
    </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import LikeButton from "../components/LikeButton.vue";

export default {
    name: "StoryViewer",
    components: {
        LikeButton
    },
    props: {
        storyid: String,
        createnew: Boolean
    },
    data() {
        return {
            lines: [],
            storykey: this.storyid||null,
            storyTitle: "Loading title...",
            nextLine: "",
            canedit: false,
            maxCharCount: 240,
            create: this.createnew||false,
            message:null
        }
    },
    created() {
        this.init();
    },
    methods: {
        getLines() {
            let linesRef = firebase.database().ref('lines/'+this.storykey+"/");
            linesRef.on('value', (snapshot) => {

                this.canedit = false;

                if(!snapshot.exists()) {
                    this.canedit = true;
                }

                this.lines = [];

                snapshot.forEach((data) => {
                    let line = data.val();
                    line.key = data.key;
                    this.lines.push(line);
                });

                if(this.lines[this.lines.length-1].user !== this.$root.$data.user.uid) {
                    this.canedit = true;
                }

                if(!this.canedit) {
                    this.message = {
                        text: "Sorry, you can't edit the same story twice in a row.",
                        error: false
                    };
                }
                else {
                    this.message = null;
                }
            }, (err)=> {
                this.message = {
                    text: err.message,
                    error: true
                };
                console.log(err);
                return;
            });
        },
        async submitData() {
            if(!this.canedit || this.$root.$data.user === null || this.$root.$data.user.uid === null || this.$root.$data.user.uid === undefined) {
                return;
            }

            if(this.create) {
                var storiesListRef = firebase.database().ref('stories');
                var newStoryRef = storiesListRef.push();

                this.storykey = newStoryRef.key;

                try {
                    await new Promise((resolve, reject) => {
                        newStoryRef.set({
                            title: this.storyTitle
                        }, (err)=> {
                            if(err) {
                                reject(err);
                            }
                            resolve();
                        });
                    });
                    this.create = false;
                }
                catch(err) {
                    console.log(err);
                }
            }

            let lineRef = firebase.database().ref('lines/'+this.storykey+"/").push();
            lineRef.set({
                text: this.nextLine,
                user: this.$root.$data.user.uid,
                time: firebase.database.ServerValue.TIMESTAMP
            }, 
            (err) => {
                if(err === null) {
                    this.canedit = false;
                    this.nextLine = "";
                    this.getLines();
                }
            });
        },
        init() {
            if(!this.createnew) {
                //Load lines
                this.getLines();

                //Load title
                let storyTitleRef = firebase.database().ref('stories/'+this.storykey+"/title");
                storyTitleRef.once('value', (snapshot) => {
                    if(!snapshot.exists()) {
                        this.message = {
                            text: "Error getting story.",
                            error: true
                        };
                        return;
                    }
                    this.storyTitle = snapshot.val();
                });
            }
            else {
                this.storyTitle = "";
                this.storykey = null;
                this.canedit = true;
            }
        }
    },
    computed: {
        charCount() {
            return this.nextLine.length;
        }
    },
    watch: {
        storyid: function() {
            this.storykey = this.storyid;
            this.init();
        }
    }
}
</script>

<style scoped>

    .story-view {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
    }

    .story-lines {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 5px 0px;
        flex: 1;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
    }

    .story-line {
        font-size: min(max(1.75vw, 16px), 20px);
        color: var(--font-color);
        display: flex;
        flex-wrap: wrap;
        place-content: flex-end;
        align-items: center;
        padding: 2% 3%;
        border-radius: 2px;
        transition: background-color 0.25s;
        text-align: justify;
    }

    .currentuser {
        border-bottom: 2px solid var(--color-2);
    }

    .story-line p {
        text-align: justify;
    }

    .char-count {
        margin-left: 5px;
        margin-right: 5px;
    }

    .story-line:hover {
        background-color: var(--color-3);
    }

    .line-text {
        flex: 1;
        text-align: left;
    }

    .line-likes {
        align-self: flex-end;
    }

    .button {
        transition: fill 0.25s, color 0.25s;
    }

    .button:hover {
        background-color: initial;
    }

    .story-title {
        font-size: min(max(2.2vw, 24px), 30px);
        width: 100%;
        text-align: left;
        padding: 25px 3%;
        display: flex;
    }

    .invisible-input {
        background: none;
        outline: none;
        border: none;
        color: inherit;
        font-size: inherit;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
    }

    .invisible-input::placeholder {
        color: inherit;
        opacity: 0.75;
    }

    input:focus {outline:none !important;}

    .message {
        background-color: white;
        color: #444;
        place-content: flex-start;
    }

    .message.error {
        color: lightcoral;
    }

</style>
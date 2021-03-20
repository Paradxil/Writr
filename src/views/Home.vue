<template>
    <div class="home">
        <div class="header">
            <div class="page-title">Write Together</div>
            <div class="tagline">One Line at a Time</div>
            <div class="features">
                <div class="feature">
                    <div class="feature-title"><icon-base name="edit-2" /></div>
                    <div class="feature-content">
                        Take turns writing lines in a story.
                    </div>
                </div>
                <div class="feature">
                    <div class="feature-title"><icon-base name="clock" /></div>
                    <div class="feature-content">
                        View updates to the story in real time.
                    </div>
                </div>
                <div class="feature">
                    <div class="feature-title"><icon-base name="heart" /></div>
                    <div class="feature-content">
                        Like stories and individual lines.
                    </div>
                </div>
            </div>
        </div>
        <div class="top-wrapper">
            <h2 class="section-title">Stories</h2>
            <router-link to="/view/false"><button type="button" title="Edit a random story.">Random</button></router-link>
            <router-link to="/view/true"><button type="button" title="Write the first line in a new story.">New</button></router-link>
        </div>
        <div class='story-browser-wrapper'>
            <StoryBrowser :max="25"/>
        </div>
    </div>
</template>
<script>


// @ is an alias to /src
import StoryBrowser from '../components/StoryBrowser.vue';

export default {
    name: 'Home',
    components: {
        StoryBrowser
    }
}
</script>

<style scoped>

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 2%;
        margin: 0px 0px;
    }

    .page-title {
        font-size: 36px;
    }

    .tagline {
        font-size: 24px;
    }

    .top-wrapper {
        margin-top: 30px;
        display: flex;
        padding: 0px 3%;
        align-items: flex-end;
        font-size: 24px;
    }

    .section-title {
        flex: 1;
        text-align: left;
    }

    .story-browser-wrapper {
        margin-top: 0px;
    }

    .features {
        margin-top: 35px;
        display: flex;
        flex-wrap: wrap;
    }

    .feature-title {
        font-size: 30px;
        padding-bottom: 10px;
        padding-right: 15px;
        padding-left: 15px;
    }

    .feature {
        flex: 1;
        margin: 10px;
        border-radius: 2px;
        padding: 30px;
        border: 2px solid var(--color-2);
        background-color: var(--color-2);
        box-shadow: 0px 0px 5px rgba(0,0,0,0.25);
    }

</style>
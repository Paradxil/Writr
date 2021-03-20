<template>
    <div id="app">
        <div class="header">
            <div class="brand">Writr</div>
            <div id="nav">
                <router-link to="/">Home</router-link>
                <router-link to="/view/false">Write</router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: "StoryWriterApp"
}
</script>


<style>
:root {
    --color-1: #5f7782;
    --color-2: #d8b26e;
    --color-3: #dad5d2;
    --color-4: #b4c1c5;
    --font-color: #444;
    --shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
}

* {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
}

body {
    background-color: var(--color-1);
    color: white;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.header {
    padding: 16px 16px;
    display: flex;
    align-items: center;
}

.brand {
    flex: 1;
    text-align: left;
    font-size: 42px;
}

#nav {
    display: flex;
    place-content: flex-end;
}

#nav a {
    font-weight: bold;
    color: var(--font-color);
    text-decoration: none;
    background-color: var(--color-4);
    padding: 16px;
    border-radius: 2px;
    margin-left: 5px;
    transition: background-color 0.25s, color 0.25s;
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
}

#nav a:hover {
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
}

#nav a.router-link-exact-active {
}

button {
    background-color: var(--color-2);
    outline: none;
    border: none;
    padding: 12px 16px;
    margin: 5px;
    color: white;
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.25);
    transition: background-color 0.25s, box-shadow 0.25s, color 0.25s, opacity 0.25s;
    cursor: pointer;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 700;
    opacity: 0.8;
    border-radius: 2px;
}

button:hover {
    opacity: 1;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
    color: white;
}

button.flat {
    box-shadow: none !important;
}

.button {
    padding: 4px 10px;
    text-align: right;
    transition: background-color 0.25s;
    margin-left: 5px;
    cursor: pointer;
    display: flex;
    place-content: center;
    align-items: center;
}

.button .vue-feather {
    margin-left: 5px;
}

.button:hover {
    border-radius: 2px;
    background-color: var(--color-3);
}

</style>

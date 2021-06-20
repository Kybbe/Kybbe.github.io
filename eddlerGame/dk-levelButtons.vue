<template>
    <div id="levelButtons" v-cloak>

        <div class="row mb-3">
            <div class="col-12">
                <div class="btn-group d-flex mx-4 mb-2 border rounded lvls" role="group">
                    <button type="button" class="btn btn-light w-100" v-on:click="newLevel(1)" :class="{ active: level === 1 }">Nivå 1</button>
                    <button type="button" class="btn btn-light w-100" v-on:click="newLevel(2)" :class="{ active: level === 2 }">Nivå 2</button>
                    <button type="button" class="btn btn-light w-100" v-on:click="newLevel(3)" :class="{ active: level === 3 }">Nivå 3</button>
                    <button type="button" class="btn btn-light w-100" v-on:click="newLevel(4)" :class="{ active: level === 4 }">Nivå 4</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
module.exports = {
    delimiters: ["{[{", "}]}"],
    props: {
        level: Number,
    },
    methods: {
        newLevel(lvl) {
            this.$emit('sendnewlevel', lvl);
        }
    }
    
}
</script>
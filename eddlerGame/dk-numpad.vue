<template>
    <div class="row mb-4">
            <div class="col-md-10 mx-auto offset-1 numpadCol">
                <div class="numberPad px-0">
                    <button
                        v-for="num in numPad"
                        :class="{ 'border-bottom' : num < 5, 'border-right' : num !== 4  || num !== 9 }"
                        class="numberpad-btn"
                        type="button"
                        @click="inputInt(num)"
                        v-bind:key="num"
                        >
                        {[{num}]}
                    </button>
                    
                    <button class="btn backspace border-top" type="button" @click="inputInt('Backspace')"><i class="fas fa-backspace"></i></button>
                </div>
            </div>
        </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            numPad: [0,1,2,3,4,5,6,7,8,9]
        }
    },
    delimiters: ["{[{", "}]}"],
    methods: {
        inputInt(num) {
            this.$emit('sendnumber', num);
        }
    }
}
</script>

<style>

    .numberPad {
        width: 100%;
        z-index: 4;
        overflow: hidden;
        border-radius: 9px;
        border: 1px solid #c7d6ec;
    }
    .numberpad-btn {
        width: 9.0909%;
        float: left;
        border: none;
        height: 50px;
        background: #edf2f9;
        font-size: 1.2rem;
    }
    .numberpad-btn:hover, .backspace:hover {
        background: #c7d6ec;	
    }
    .backspace {
        width: 9.0909%;
        border: none;
        height: 50px;
        background: #edf2f9;
        border-radius: 0px;
    }

    @media (max-width: 767px) {
        .numberpad-btn {
            width: 20%;
        }
        .backspace {
            width: 100%;
            height: 40px;
            font-size: 20px;
        }
    }
</style>
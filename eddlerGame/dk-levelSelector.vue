<template>
<div class="levelselectorDropdown">

    <div id="lists" data-toggle="lists" data-options="{'valueNames': ['name'], 'page': 3, 'pagination': true}">
                <div class="card-header">
                    <h4 class="card-header-title" v-html=" `<p style='color: rgb(100, 100, 100)'> Nivå: '${selectedLevel}.<span> ${currentDescription} </span><p>` "> </h4> 

                    <div class="col-auto">
                        <a class="btn btn-sm btn-white" id="nivaKnapp" v-on:click="showSelectorToggle()">
                            Byt nivå
                        </a>
                    </div>
                </div>

                <div class="card-body" v-show="showSelector" style="max-height: 330px; overflow-y: auto;">

                    <ul class="list-group list-group-flush list my-n3" style="z-index: 8;">

                        <li class="list-group-item"
                            v-bind:value="level.id"  
                            v-bind:key="level.id" 
                            v-show="showSelector"
                            v-for="level in levls">
                        <div class="row align-items-center">

                            <div class="col ml-n2">

                            <h4 class="mb-1 name">
                                <a> Nivå: {[{level.id}]}. <span id="nivåListDesc">{[{level.description}]}</span></a>
                            </h4>

                            <p class="small mb-0">
                                Ex: {[{level.example}]}
                            </p>

                            </div>
                            <div class="col-auto">

                            <!-- Button -->
                            <a v-show="selectedLevel != level.id" class="btn btn-sm btn-white" @click="showSelectorToggle(); changeLevel(level.id)">
                                Spela
                            </a>

                            <p v-show="selectedLevel == level.id" class="btn btn-sm btn-white" :class="{'bg-success' : selectedLevel == level.id}">
                                Nuvarande
                            </p>

                        </div>
                    </div>

                    </li>
                </ul>

            </div>
        </div>
    
</div>
</template>

<script>
module.exports = {
    data: function() {
        return {
        showSelector: false,
        selectedLevel: "",
        currentDescription: "",
        currentEx: "",
        }
    },
    delimiters: ["{[{", "}]}"],
    props: {
        level: String,
        levls: Object
    },
    methods: {
        showSelectorToggle () {
            if(this.$parent.isGoodToGo()){
                elem = document.getElementById("nivaKnapp");
                if(this.showSelector == false) {
                    this.showSelector = true;
                    elem.innerHTML = "Stäng meny";
                } else {
                    this.showSelector = false;
                    elem.innerHTML = "Byt nivå";
                }
            }
        },

        changeLevel(num) {
            this.selectedLevel = num;
            for(i in this.levls) {
                if(this.levls[i].id == num) {
                    this.currentDescription = this.levls[i].description;
                    this.currentEx = this.levls[i].example;
                }
            }
            this.$emit('sendnewlevel', num);
        }

    },
    mounted() {
        this.$nextTick(function () {
            this.changeLevel(this.level);
        })
    },
}
</script>

<style>

h4 span, h3 span {
    color: rgb(100, 100, 100);
    font-style: italic;
}

.currentlevel {
    padding-top: 10px;
}

.levlselector {
    background-color: #e7f0fffa;
}

#lists {
    background-color: white;
    border: 1px solid darkgrey;
    box-shadow: 2px 2px 4px grey;
    border-radius: .25rem;
}    

.bg-active {
    background-color: #cbcbcc
}

.levelMenu {
  position: absolute;
  z-index: 8;
}
.card-body::-webkit-scrollbar {
    -webkit-appearance: none;
}

.card-body::-webkit-scrollbar:vertical {
    width: 10px;
}

.card-body::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: #a0b0c7c2;
}
#example {
    font-size: 15px;
}

.card-header-title span{
    display: inline;
}

.levelselectorDropdown .btn {
    border: 1px solid grey !important;
}

@media (max-width: 345px) {
    .card-header-title span {
        display: none;
    }
}
@media (max-width: 575px) {
    #nivåListDesc {
        display: none;
    }
    .levelMenu {
        width: 90% !important;
    }
}

</style>
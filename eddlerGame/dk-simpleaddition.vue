<template>
<div id="simpleaddition" v-cloak>
    <div style="max-width: 770px !important; margin-left: auto; margin-right: auto;">
    <!-- Credits och kopiera Url -->
        <dk-topbar :link = currentUrl></dk-topbar>  

    <!-- Nivå-knappar--> 
        <dk-levelbuttons v-if="!levelshortcode" v-bind:level = currentLevel @sendnewlevel="enterEmitLevel"></dk-levelbuttons>
        <dk-levelselector v-if="levelshortcode" :levls = levels v-bind:level = levelshortcode @sendnewlevel="enterEmitLevel" class="mb-3"></dk-levelselector>
    <!-- Messages -->
        <div class="row mb-4" id="scoresRow">
            <div class="col-1 spacer"></div>

            <div  class="col-2">
                <div class="position-absolute avatar-wrapper">
                <div class="speech-bubble text-center isCorrectBubble" v-show="messages.isCorrect">
                    <div>
                        <p v-show="messages.isCorrect" class="text-primary">Rätt! </p>
                    </div>
                </div>

                <div class="speech-bubble text-center" v-show="messages.isFalse">
                    <div>
                        <p class="text-danger">Fel!</p>
                    </div>
                    <button 
                        v-on:click="softRestart()" 
                        v-show="messages.isFalse" 
                        class="btn btn-block btn-light btn-rounded btn-sm">
                            <i class="fas fa-sync-alt"> </i>
                        Testa igen
                    </button>
                    <button 
                        v-on:click="generateNewTerms()" 
                        v-show="messages.isFalse" 
                        class="btn btn-block btn-light btn-rounded btn-sm">
                            <i class="fas fa-arrow-circle-right"></i> 
                        Nya tal
                    </button>
                    <button 
                        v-on:click="showCorrect()" 
                        v-show="messages.isFalse" 
                        class="btn btn-sm btn-block btn-rounded btn-light" >
                        Se rätt
                    </button>
                </div>

                <div class="speech-bubble text-center" v-show="messages.newLevel">
                    <div>
                        <p v-show="messages.newLevel" class="text-primary">Byter till nästa nivå! </p>
                            
                    </div>
                </div>

                <div class="speech-bubble text-center" v-show="messages.gameEnd">
                    <h4>Du klarade hela spelet, bra jobbat!</h4>
                    <button 
                        v-on:click="restartGame()" 
                        class="btn btn-small btn-rounded btn-light">
                        Starta om
                    </button>
                </div>

                <dk-avatars> </dk-avatars>
                </div>
            </div>
                
    <!-- Score-räknare -->
            <div :class="{'col-1 col-sm-1 col-md-3' : !levelshortcode, 'col-1' : levelshortcode }"></div>
            <div v-if="levelshortcode" class="col-2"></div>
            <div class="text-center" :class="{'col-4 col-sm-4 col-md-2' : !levelshortcode, 'col-4 offset-1' : levelshortcode }">
                <div id="scoreCounter" :class="{'border-info': newLevel}" class="border rounded" v-html="score + ' / ' + maxscore"></div>
            </div>
    <!-- Stjärnor -->
            <div v-if="!levelshortcode" class="col-3" style="max-height: 55px">
                <i class="fas fa-star" :class="{ 'text-warning': Level1 == 5 }"></i>
                <i class="fas fa-star" :class="{ 'text-warning': Level2 == 5 }"></i>
                <i class="fas fa-star" :class="{ 'text-warning': Level3 == 5 }"></i>
                <i class="fas fa-star" :class="{ 'text-warning': Level4 == 5 }"></i>
            </div>
            <div class="col-1 spacer"></div>
        </div>
    <!-- Divs för termer och summan -->
            <div class="row text-center mb-4 offset-sm-1">
                <div
                    class="col-2 term digitbox ml-3"
                    v-html="termNumbers.term1"
                    :id="termNumbers.id"
                > </div> 
                <div id="symbol" class="col-2"><p>+</p></div> 
                <div
                    class="col-2 term digitbox"
                    v-html="termNumbers.term2"
                    :id="termNumbers.id"
                > </div> 
                <div id="symbol" class="col-2"><p>=</p></div> 
                <div
                    class="col-3 col-md-2 result digitbox"
                    v-html="termNumbers.result"
                    :class="{ 'border-warning': isFalse, 'border-success': greenBorder || gameEnd, 'border-info': showingCorrect}"
                    :id="termNumbers.id"
                >  </div>
            </div>
            

    <!-- Numperpad // knappar -->
    <dk-numpad @sendnumber="enterEmitInt"></dk-numpad>
    
    </div>
</div>
</template>
<script>
module.exports = {
    components: {
        'dk-topbar': httpVueLoader('./dk-topbar.vue'),
        'dk-levelbuttons': httpVueLoader('./dk-levelButtons.vue'),
        'dk-avatars': httpVueLoader('./dk-avatars.vue'),
        'dk-numpad': httpVueLoader('./dk-numpad.vue'),
        'dk-levelselector': httpVueLoader('./dk-levelSelector.vue')
    },

    data: function() {
        return {
            score: 0,
            currentLevel: 1,
            term1: 1,
            term2: 2,
            selectedLevel: "1",
            Level1: 0, // Scores för nivå 1,
            Level2: 0, // 2,
            Level3: 0, // 3,
            Level4: 0, // och 4.
            newTermNumbers: {},
            messagesDivs: {},
            isCorrect: false, // Rätt svar?
            greenBorder: false,
            isFalse: false, // Fel svar?
            newLevel: false, // Som en "?should be loading?"
            currentClicks: 0, // Antal klickningar eller inputs
            gameEnd: false,
            levels: {
                level1: {
                    id: "1", description: "Ental <= 10", example: "1 + 5"
                },
                level2: {
                    id: "2", description: "Ental", example: "7 + 9"
                },
                level3: {
                    id: "3", description: "Tiotal + ental", example: "40 + 6"
                },
                level4: {
                    id: "4", description: "1 till 50", example: "42 + 29"
                },
                level5: {
                    id: "5", description: "Femskutt under 100", example: "15 + 10"
                },
                level6: {
                    id: "6", description: "Tioskutt under 100", example: "30 + 60"
                },
                level7: {
                    id: "7", description: "Tioskutt under 200", example: "130 + 20"
                },
                level8: {
                    id: "8", description: "Tiotal + tiotal utan tiotalsövergångar under 100", example: "23 + 44"
                },
                level9: {
                    id: "9", description: "Tiotal + tiotal med tiotalsövergågnar under 100", example: "78 + 23"
                },
                level10: {
                    id: "10", description: "Tiotal + tiotal över 100", example: "84 + 22"
                },
                level11: {
                    id: "11", description: "Hundratalskutt under 1000", example: "300 + 400"
                },
                level12: {
                    id: "12", description: "Hundratal + hundratal utan övergångar under 1000", example: "420 + 169"
                },
                level13: {
                    id: "13", description: "Hundratal + hundratal med övergångar under 1000", example: "186 + 435"
                },
                level14: {
                    id: "14", description: "Hundratal + hundratal med övergångar över 1000", example: "688 + 364"
                }
            },
            acceptDefeat: false,
            showingCorrect: false,
            currentUrl: 'https://eddler.se/lektioner/spel-addition-med-heltal/',

        }
    },
    delimiters: ["{[{", "}]}"],

    methods: {

        
        randomNumber: function(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        enterEmitLevel: function (lvl) {
                this.changeLevel(lvl);
        },

        enterEmitInt: function (num) {
            if (num == "Backspace") {
                if(this.isGoodToGo()) {
                    this.backspace();
                }
            } else {
                this.enterInt(num);
            }
        },

        enterInt: function(num) { 
            if(this.isGoodToGo()) {
                this.currentClicks++;
                this.realResult = this.term1 + this.term2;
                var maxChars;
                if (this.realResult >= 1000) {
                    maxChars = 4;
                } else if (this.realResult < 1000 && this.realResult >= 101) {
                    maxChars = 3;
                } else if (this.realResult < 100 && this.realResult >= 10) {
                    maxChars = 2;
                } else if (this.realResult < 10) {
                    maxChars = 1;
                }

                if (this.currentClicks < 2) {
                    this.newTermNumbers.result = num;
                } else if(this.currentClicks <= maxChars){
                    if ( typeof(this.newTermNumbers.result) == 'number') {
                        var resultString = this.newTermNumbers.result.toString();
                        resultString += num;
                        this.newTermNumbers.result = parseInt(resultString);
                    } else {
                        this.newTermNumbers.result = num;
                    }
                }
                if (this.currentClicks == maxChars) {
                    this.IfCorrect()
                }
            }
        },

        IfCorrect: function () {

            var self = this;

            if(this.newTermNumbers.result == (this.term1 + this.term2)) {
                this.isCorrect = true;
                this.greenBorder = true;
                var hideIsCorrect = setTimeout(function () {
                        self.isCorrect = false;
                        self.greenBorder = false;
                        if(self.levelshortcode) {
                            if(self.score == (self.maxscore - 1)) {
                                self.score++;
                                self.gameEnd = true;
                            } else {
                                self.score++;
                                self.generateNewTerms();
                            }
                        } else {
                            self.IfNewLevel();
                        }
                }, 2000);

            } else {
                this.isFalse = true;
            }
        },

        IfNewLevel: function () {
            if(this.score == (this.maxscore - 1)) { // Om över max poäng ska nivå bytas
                if(this.currentLevel == 4) {
                    this.score++;
                    this.checkGameEnd();
                    this.changeLevel(4);
                } else {
                    this.score++;
                    this.saveChangeLevel();
                }
            } else if (this.score <= (this.maxscore - 1) ){
                this.score++;
                this.generateNewTerms();
            } else {
                this.saveChangeLevel();
            }
        },

        isGoodToGo() {
            if (this.gameEnd == false && this.isFalse == false && this.isCorrect == false){
                return true;
            } else {
                return false;
            }
        },

        saveChangeLevel() {
            
            var self = this;

            this.newLevel = true;
            this.greenBorder = true;
                var hideNewLevel = setTimeout(function () {
                        self.newLevel = false;
                        self.greenBorder = false;
                        self.generateNewTerms();
                }, 1300);
            this['Level'+this.currentLevel] = this.score;
            this.currentLevel++;
            this.score = this['Level'+this.currentLevel]
        },

        softRestart() {
            this.newTermNumbers.result = '<span class="blinking-cursor">|</span>';
            this.currentClicks = 0;
            this.isFalse = false;
        },

        showCorrect() {

            var self = this;

            this.isFalse = false;
            this.showingCorrect = true;
            this.newTermNumbers.result = (this.term1 + this.term2)
            var showingCorrectTimout = setTimeout(function () {
                        self.showingCorrect = false;
                        self.generateNewTerms();
            }, 2000);
        },

        backspace(){
            if ( typeof(this.newTermNumbers.result) == 'number') {
                this.currentClicks--;
                var resultString = this.newTermNumbers.result.toString();
                resultString = resultString.substring(0, resultString.length - 1);
                if(resultString == "") {
                    this.newTermNumbers.result = '<span class="blinking-cursor">|</span>';
                } else {
                    this.newTermNumbers.result = parseInt(resultString);
                }
            }
        },

        doCommand(e) {
            if (this.isGoodToGo()){
                if (e.key == "Backspace"){
                    this.backspace();
                }

                if (e.key >= 0 && e.key <= 9) { 
                    this.enterInt(e.key)
                }
            }
        },
        
        changeLevel(newLevel) {

            if(!this.levelshortcode){
                this['Level'+this.currentLevel] = this.score;
            } 
            else {
                this.score = 0;
            }

            this.currentLevel = newLevel;
            this.generateNewTerms();

            if(!this.levelshortcode){
                this.score = this['Level'+newLevel]
            }

        },

        checkGameEnd () {
            if (this.Level1 < 5) {
                this.changeLevel(1);
            } else if (this.Level2 < 5) {
                this.changeLevel(2);
            } else if (this.Level3 < 5) {
                this.changeLevel(3);
            } else {
                this.gameEnd = true;
            }
        },

        restartGame() {
            location.reload();
        },

        generateNewTerms: function () {
            if(!this.levelshortcode) {
                if (this.currentLevel == 1) {
                    this.term1 = this.randomNumber(1,5);
                    this.term2 = this.randomNumber(1,4);
                } else if (this.currentLevel == 2) {
                    this.term1 = this.randomNumber(5, 10);
                    this.term2 = this.randomNumber(5, 10);
                } else if (this.currentLevel == 3) {
                    this.term1 = (this.randomNumber(1, 9) * 10);
                    this.term2 = this.randomNumber(1, 9);
                } else if (this.currentLevel == 4) {
                    this.term1 = (this.randomNumber(11, 50));
                    this.term2 = this.randomNumber(11, 49);
                }
            } else {
                if (this.currentLevel == 1) {
                    this.term1 = this.randomNumber(1,5);
                    this.term2 = this.randomNumber(1,5);
                } else if (this.currentLevel == 2) {
                    this.term1 = this.randomNumber(5, 10);
                    this.term2 = this.randomNumber(5, 10);
                } else if (this.currentLevel == 3) {
                    this.term1 = (this.randomNumber(1, 5) + 10);
                    this.term2 = this.randomNumber(1, 5);
                } else if (this.currentLevel == 4) {
                    this.term1 = (this.randomNumber(5, 10) + 10);
                    this.term2 = this.randomNumber(5, 10);
                } else if (this.currentLevel == 5) {
                    this.term1 = (this.randomNumber(1, 10) * 5);
                    this.term2 = (this.randomNumber(1, 10) * 5);
                } else if (this.currentLevel == 6) {
                    this.term1 = (this.randomNumber(1, 5) * 10);
                    this.term2 = (this.randomNumber(1, 5) * 10);
                } else if (this.currentLevel == 7) {
                    this.term1 = (this.randomNumber(1, 10) * 10);
                    this.term2 = (this.randomNumber(1, 10) * 10);
                } else if (this.currentLevel == 8) {
                    this.term1 = this.randomNumber(11, 50);
                    var ental = (10 - (this.term1 % 10)) - 2; // 10 - term1 ental - 2, ex (64 % 10) = 4 (- 2) = 2
                    var tiotal = (10 - ((this.term1 - (ental + 2)) / 10) - 1)
                    this.term2 = (this.randomNumber(1, tiotal) * 10) + this.randomNumber(1, ental); // 10,20,30 etc + 2 = ex 80 + 2 = 82
                } else if (this.currentLevel == 9) {
                    this.term1 = (this.randomNumber(1, 5) * 10) + this.randomNumber(5, 9);
                    this.term2 = (this.randomNumber(1, 4) * 10) + this.randomNumber(5, 9);
                    if ((this.term1 + this.term2) > 100) {
                        this.generateNewTerms();
                    }
                } else if (this.currentLevel == 10) {
                    this.term1 = (this.randomNumber(5, 9) * 10) + this.randomNumber(5, 9);
                    this.term2 = (this.randomNumber(5, 9) * 10) + this.randomNumber(5, 9);
                } else if (this.currentLevel == 11) {
                    this.term1 = this.randomNumber(1, 5) * 100;
                    this.term2 = this.randomNumber(1, 4) * 100;
                } else if (this.currentLevel == 12) {
                    this.term1 = (this.randomNumber(1, 5) * 100) + (this.randomNumber(1, 5) * 10) + (this.randomNumber(1, 5));
                    this.term2 = (this.randomNumber(1, 4) * 100) + (this.randomNumber(1, 4) * 10) + (this.randomNumber(1, 4));
                } else if (this.currentLevel == 13) {
                    this.term1 = (this.randomNumber(1, 5) * 100) + (this.randomNumber(5, 9) * 10) + (this.randomNumber(5, 9));
                    this.term2 = (this.randomNumber(1, 4) * 100) + (this.randomNumber(5, 9) * 10) + (this.randomNumber(5, 9));
                    if(this.term1 + this.term2 > 1000) {
                        generateNewTerms();
                    }
                } else if (this.currentLevel == 14) {
                    this.term1 = (this.randomNumber(5, 9) * 100) + (this.randomNumber(5, 9) * 10) + (this.randomNumber(5, 9));
                    this.term2 = (this.randomNumber(5, 9) * 100) + (this.randomNumber(5, 9) * 10) + (this.randomNumber(5, 9));
                }
            }
            
            this.newTermNumbers.result = '<span class="blinking-cursor">|</span>';
            this.currentClicks = 0;
            this.isFalse = false;
        },

    },

    props: {
        levelshortcode: {
            type: String,
            required: false,
            default: null
        },
        maxscore: {
            type: String,
            required: false,
            default: "5"
        }
    },

    computed: {
        termNumbers: function () {
        this.newTermNumbers = {
            id: 1,
            term1: this.term1,
            term2: this.term2,
            result: '<span class="blinking-cursor">|</span>'
        };
        return this.newTermNumbers;
        },

        messages: function () {
            this.messagesDivs = {
                isCorrect: this.isCorrect,
                isFalse: this.isFalse,
                newLevel: this.newLevel,
                gameEnd: this.gameEnd
            };

            return this.messagesDivs;
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand);
        
    },
    mounted() {
        this.$nextTick(function () {
            this.generateNewTerms();
        })
    },
}
</script>

<style>

    #scoreCounter {
        font-size: 27px;
        border-color: #CCCCCC !important;
    }

    #symbol p, .fa-star {
        font-size: 30px;
        margin-bottom: 0px !important;
    }

    .feat-tag {
        color: #c0c0c0e5;
        padding: 5px;
        font-size: 11px;
        vertical-align: 4px;
        background-color: #ccf7e5;
        display: inline-block;
    }

    .br {
        height: 6px;
        width: 80%;
        border-radius: 3px;
    }

    .digitbox {
        height: 47px;
        width: 35px !important;
        margin: 0 2px 0;
        padding: 2px;
        text-align: center;
        font-size: 27px;
        border: 1px solid #CCCCCC;
    }

    .lvls {
        border-color: #CCCCCC !important;
    }

    #lists li[value="1"] {
        margin-top: 20px;
    }

    .speech-bubble {
        position: absolute;
        background: #afe2f2;
        border-radius: .4em;
        width: 115px;
        left: 65px;
        padding: 7px 3px;
        box-shadow: 3px 4px 6px#cccccc;
        z-index: 5;
        top: 5px;
    }
    .speech-bubble:after {
        content: '';
        position: absolute;
        left: 1px;
        top: 23%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-right-color: #afe2f2;
        border-left: 0;
        border-bottom: 0;
        margin-top: -10px;
        margin-left: -20px;
    }

    .border-success, .border-warning {
        border-width: 3px !important;
    }

    .blinking-cursor {
        font-weight: 100;
        font-size: 30px;
        color: #2E3D48;
        -webkit-animation: 1s blink step-end infinite;
        -moz-animation: 1s blink step-end infinite;
        -ms-animation: 1s blink step-end infinite;
        -o-animation: 1s blink step-end infinite;
        animation: 1s blink step-end infinite;
    }

@keyframes blink {
    from, to { 
        color: transparent; 
    }
    50% {
        color: black;
    }
}

@-moz-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

@-webkit-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

@-ms-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

@-o-keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: black;
  }
}

    @media (max-width: 670px) {
        .numpadCol {
            margin-left: 25px;
        }
    }

    @media (max-width: 585px) {
        .numpadCol {
            margin-left: 0px;
        }
    }

    @media (max-width: 420px) {
        i.fa-star {
            font-size: 15px !important;
        }
        .lvls .btn {
            font-size: 12px !important;
            padding-left: 6px !important;
            padding-right: 6px !important;
        }
        .isCorrectBubble {
            width: 60px !important;
        }
        .result { 
            font-size: 25px !important;
        }
        .term {
            font-size: 24px;
        }
        #container {
            padding: 0px;
            margin-left: 0px;
            margin-right: 0px;
        }
}
</style>
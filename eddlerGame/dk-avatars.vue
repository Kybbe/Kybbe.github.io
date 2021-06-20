<template>
    <div id="avatars" v-cloak>
            <div class="text-center">
                <img 
                    style="margin: 0 auto;" 
                    v-bind:src="'../eddlerGame/' + selectedAvatar" 
                    width="80%" 
                    class="rounded-circle">
            </div>
            <div class="text-center" v-html="additionName"></div>
            
            <div class="avatarDropdown">
                <b-dropdown class="m-md-2" variant="light">
                    <b-dropdown-text style="margin: 10px">
                        <input type="text" class="form-control" placeholder="Ditt namn" v-model="additionName">
                    </b-dropdown-text>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item 
                    v-bind:value="avatar.value" 
                    v-on:click="selectedAvatar = avatar.value" 
                    v-bind:key="avatar.value" 
                    v-for="avatar in additionAvatars">
                        <img 
                            style="margin: 0 auto;" 
                            v-bind:src="'../eddlerGame/' + avatar.value" 
                            width="60px" 
                            class="rounded-circle" />
                    </b-dropdown-item>
                </b-dropdown>
            </div>

    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            additionName: '',
            selectedAvatar: 'unicorn-avatar.png',
		    additionAvatars: [
                { name: 'Unknown', value: 'unknown-avatar.png' },
		        { name: 'Unicorn', value: 'unicorn-avatar.png' },
		        { name: 'Robot', value: 'robot-avatar.png' },
                { name: 'Monster', value: 'monster-avatar.png' }
            ],
        }
    },
    delimiters: ["{[{", "}]}"],
    props: {
        
    },
    methods: {
        
    },
    mounted() {
        if (localStorage.selectedAvatar) {
            this.selectedAvatar = localStorage.selectedAvatar;
        }
        if (localStorage.additionName) {
            this.additionName = localStorage.additionName;
        }
    },
    watch: {
        selectedAvatar(newSelectedAvatar) {
            localStorage.selectedAvatar = newSelectedAvatar;
        },
        additionName(newAdditionName) {
            localStorage.additionName = newAdditionName;
        }
    }
    
}
</script>

<style>
    .avatar-wrapper {
        width: 65px;
    }

    .avatarDropdown {
        z-index: 2;
        margin: 0;
        position: absolute;
        left: 8px;
        top: 2px;
    }

    .avatarDropdown .dropdown-toggle {
        border-radius: 100%;
        background: transparent;
        color: transparent;
        border: none;
        width: 100%;
    }

    .dropdown-menu {
        min-width: 8rem !important;
    }
    
    .btn-light.focus, .btn-light:focus {
        box-shadow: none;
    }

    .additionName {
        border-radius: none;
        font-weight: bold;
        border-style: none;
    }
</style>
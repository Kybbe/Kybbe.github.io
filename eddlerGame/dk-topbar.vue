<template>
	<div id="topbar" v-cloak>

    	<div class="row border rounded bg-light mb-3"> 
            <div class="col-sm-7">
                <h4 class="mt-2"><span class="badge-free">Ett gratisspel från Eddler</span><span class="badge-free feat-tag">(feat. Jacob K)</span></h4>
            </div>
            <div class="col-sm-5 text-md-right">
                <span class="text-success" v-show="copyLinkSuccessful">Kopierad!</span>
                <a href="#" target="_self" @click="copyCurrentUrl()" class="btn btn-light btn-sm"><i class="fas fa-link"></i> Kopiera och dela länk till spelet!</a>
                <input type="hidden" id="current-url-input-addition" :value="link">
            </div>
        </div>
	
	</div>
</template>

<script>
module.exports = {

    data: function() {
        return {
            copyLinkSuccessful: false,
        }
    },
    delimiters: ["{[{", "}]}"],
    props: {
        link: String

    },
    methods: {

        copyCurrentUrl: function () {
			var self = this;

			var testingCodeToCopy = document.querySelector('#current-url-input-addition');
			testingCodeToCopy.setAttribute('type', 'text');
			testingCodeToCopy.select();

			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';

				if (successful) {
					this.copyLinkSuccessful = true;
					var hidecopyLinkSuccessful = setTimeout(function () {
						self.copyLinkSuccessful = false;
					}, 3000);
				}
				else {
					self.$bvToast.toast('Lektionslänk INTE kopierad till utklipp.', {
					title: 'Inte kopierat!',
					autoHideDelay: 5000,
					toaster: 'b-toaster-top-center',
					solid: true,
					variant: "warning",
					appendToast: true
					})
				}
			
			} catch (err) {

				self.$bvToast.toast('Det gick INTE att kopiera länken.', {
				title: 'Inte kopierat!',
				autoHideDelay: 5000,
				toaster: 'b-toaster-top-center',
				solid: true,
				variant: "danger",
				appendToast: true
				})
			}

			testingCodeToCopy.setAttribute('type', 'hidden');
			window.getSelection().removeAllRanges();
		}

    }

}
</script>
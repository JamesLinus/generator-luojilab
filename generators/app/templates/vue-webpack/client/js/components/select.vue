<style>
	.radon-select-container {
	    position: relative;
	    border: 1px solid #ccc;
	    display: inline-block;
	    min-width: 6rem;
	    border-radius: 4px;
	    height: 2rem;
	    line-height: 2rem;
	    padding: 0 2rem 0 .5rem;
	}
	.radon-select-arrow {
		position: absolute;
	    top: 0;
	    right: .5rem;
	    font-size: .4rem;
	    transform: rotate(0);
	    transition: transform 0.2s ease;
	}
	.radon-select-container.active .radon-select-options-container {
		display: initial;
	}
	.radon-select-container.active .radon-select-arrow{
		transform: rotate(180deg);
	}
	.radon-select-options-container {
		display: none;
		position: absolute;
	    background: #fff;
	    min-width: 6rem;
	    border-radius: 4px;
	    padding: 0;
	    border: 1px solid #ccc;
	    top: 2.2rem;
	    left: -1px;
	}
	.radon-select-option {
		padding: 0 .5rem;
	}
	.radon-select-option.selected {
		background: #e6e6e6;
	}
	.radon-select-option.disabled{
		color: #ccc;
		cursor: not-allowed;
	}
	.radon-select-option:hover {
		background: #f7f7f7;
	}
</style>
<template>
	<div class="radon-select-container" 
		@click="showOption"
		:class="{ 'active': show }"
	>
		<input class="radon-select-selected-value" :value="selected.value" doc/>
		<span class="radon-select-arrow ion-chevron-down"></span>
		<div class="radon-select-options-container">
			<div class="radon-select-option" 
				@click="setValue(option)" 
				v-for="option in options"
				:class="{
					'selected': option.selected,
					'disabled': option.disabled
					}"
			>{{option.value}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				show: false, 
				options: [{
					selected: false,
					disabled: true,
					value: '2333',
					id: 1
				},
				{	
					selected: true,
					disabled: false,
					value: '13333333',
					id: 1
				},
				{	
					selected: false,
					disabled: false,
					value: 'ab33333aba',
					id: 1
				}]
			}
		},
		computed: {
			selected () {
				let value = {
					selected: false,
					value: '',
					id: null
				}

				this.options.forEach(option => {
					if (option.selected) {
						value = option
					}
				})

				return value
			}
		},
		methods: {
			setValue (option) {
				if (option.disabled) return
				this.options.forEach(op => {
					op.selected = false
				})
				option.selected = true
			},
			showOption () {
				this.show = !this.show
			}
		}
	}
</script>
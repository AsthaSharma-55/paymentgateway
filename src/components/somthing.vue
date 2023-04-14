<template>
<h1>Hello</h1>
<Stripe-checkout 
  ref="checkoutRef"
  mode="payment"
  :pk="publisablekey" 
  :line-items="lineItems" 
  :success-url="successUrl"
  :cancel-url="cancelUrl"
  @loading="v =>loading=v" 
    />
<button @click="submitPayment">pay now</button>
</template>

<script>
import { StripeCheckout} from '@vue-stripe/vue-stripe'
export default {
    name: "Somthing",
    components:{
        StripeCheckout
    },
    data(){
        this.publisablekey="pk_test_51MqUDJSFgDnHJDFQ1YqBnESazTN2DwIiX0IdLmgmV9Us0baekxU0qbjVQ2IVEajtNlwrtfOWvIja6NXvOAYDBRqj00luvSDoqK"   //key from your account
        return{
            loading:false,
            lineItems:[
                {
                    price:'price_1MqUv9SFgDnHJDFQpulQ4zL4',                // this key is also from your account
                    quantity:1
                },
                
            ],
            successUrl:'http://127.0.0.1:5173/success',
            cancelUrl:'http://127.0.0.1:5173/cancel',

        }
    },
    methods:{
        submitPayment(){
            this.$refs.checkoutRef.redirectToCheckout()
        }
    }

}
</script>

<style>

</style>

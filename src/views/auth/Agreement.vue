<template>
    <div class="pk-auth">
        <nut-navbar class="pk-title" :rightShow="false">
            <a slot="back-icon" @click="goBack">返回</a>注册协议
        </nut-navbar>
        <div class="pk-register">
            <h3 v-html="text.title" class="agreement-title"></h3>
            <div v-html="text.content" class="agreement-text"></div>
        </div>
    </div>
</template>

<script>
    import {
        getTerms
    } from "../../services/auth.js";
    export default {
        data() {
            return {
                text: ""
            };
        },
        mounted() {
            getTerms().then(res => {
                if (res.success) {
                    this.text = res.data;
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            })
        },
        methods: {
            goBack() {
                console.log(1111);
                this.$router.push({
                    name: "register"
                });
            },
    
    
        }
    };
</script>

<style lang="scss" scoped>
    @import "./auth.scss";
</style>


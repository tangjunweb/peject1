<template>
  <span class="vertifycode-send">
    <slot>
      <Button size="large" :disabled="disabled" @click="run">{{text}}</Button>
    </slot>
  </span>
</template>

<script>
import { SendPhoneVierifCode } from "@/api";
import { setInterval, clearInterval } from "timers";
export default {
  name: "vertifycode-send",
  props: {
    second: {
      type: Number,
      default: 60
    },
    value: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      interval: null,
      time: 0,
      disabled: false
    };
  },
  methods: {
    run: function() {
      if (!this.disabled && this.value) {
        this.send();
        this.time = this.second;
        this.timer();
      }
    },
    timer: function() {
      this.interval = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
    },
    send() {
      if (this.value) {
        SendPhoneVierifCode({
          phoneNumber: this.value
        }).then(res => {
          this.$emit("change", res);
          this.$Message.success("验证码发送成功");
        });
      } else {
        this.$Message.warning("请输入手机号");
      }
    }
  },
  watch: {
    time(n) {
      if (n == 0) {
        clearInterval(this.interval);
      }
    }
  },
  computed: {
    text: function() {
      this.disabled = this.time > 0 ? true : false;
      return this.time > 0 ? this.time + "s再获取" : "获取验证码";
    }
  }
};
</script>

<style>
</style>

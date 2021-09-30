<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1/dist/tailwind.min.css"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/daisyui@1.11.0/dist/full.css"
      rel="stylesheet"
      type="text/css"
    />
    <main>
      <section class="colors">
        <div class="header">
          <span @click="updateTrackData()">
            <MdRefreshIcon h="32" w="32" />
          </span>
          <label for="my-modal-2" class="btn btn-primary modal-button"
            >택배 추가하기</label
          >
          <input
            type="checkbox"
            id="my-modal-2"
            class="modal-toggle"
            v-model="modal"
          />
          <div class="modal">
            <div class="modal-box">
              <div class="form-control">
                <input
                  v-model="code"
                  placeholder="운송장 번호"
                  type="text"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <input
                  v-model="name"
                  placeholder="상품 이름"
                  type="text"
                  class="input input-bordered"
                />
              </div>

              <select
                v-model="company"
                class="input input-bordered"
                style="width: 100%"
              >
                <option value="" disabled>택배사</option>
                <option
                  :key="i"
                  :value="d.id"
                  v-for="(d, i) in datas.CompanyOptions"
                >
                  {{ d.name }}
                </option>
              </select>
              <div class="alert alert-error" v-if="errorAlert">
                <div class="flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 mx-2 stroke-current"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    ></path>
                  </svg>
                  <label>{{ errorValue }}</label>
                </div>
              </div>

              <div class="modal-action">
                <label @click="addGradient()" class="btn">add</label>
                <label for="my-modal-2" class="btn">Close</label>
              </div>
            </div>
          </div>
        </div>

        <div v-for="(data, index) in gradient" :key="index">
          <div class="card lg:card-side bordered">
            <div class="card-body">
              <div class="justify-end card-actions">
                <span @click="removeGradient(index)" class="chip-remove"
                  >&times;</span
                >
              </div>
              <h2 class="card-title">{{ data.name }}</h2>
              <span> 운송장 번호 : {{ data.code }}</span>
              <span>{{ data.status }}</span>
              <div class="card-actions">
                <a :href="data.link" target="_blank">
                  <button class="btn btn-primary">More info</button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-if="gradient.length < 1">
          <div class="card lg:card-side bordered ">
            <div class="card-body">
              <h2 class="card-title">택배를 추가해 주세요!</h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import icons from "@/components/icons";
import datas from "../assets/data/delivery";
import getTrack from "../components/getTrack";
export default Vue.extend({
  name: "App",
  components: {
    ...icons,
  },
  data() {
    return {
      gradient: [] as any,
      code: "",
      company: "",
      name: "",
      datas,
      errorAlert: false,
      modal: false,
      errorValue: "",
      Completed: "",
    };
  },
  created() {
    console.log(this.datas.CompanyOptions);
    const cookie = this.$cookies.get("test");
    if (cookie != null) {
      this.gradient = JSON.parse(cookie);
      this.updateTrackData();
    }
  },
  watch: {
    gradient() {
      if (this.errorAlert == false) {
        this.modal = false;
      } else if (this.errorAlert == true) {
        this.modal = true;
      }
    },
  },
  methods: {
    cleanAll() {
      this.name = "";
      this.code = "";
      this.company = "";
    },
    addGradient() {
      let jsonObject = new Object();
      if (this.name != "" && this.code != "" && this.company != "") {
        jsonObject = {
          name: this.name,
          code: this.code,
          company: this.company,
          link: `https://tracker.delivery/#/${this.company}/${this.code}`,
          status: "",
        };
        this.gradient.push(jsonObject);
        this.$cookies.set("test", JSON.stringify(this.gradient), "30d");
        this.getTrackData(
          this.company,
          this.code,
          this.gradient.length - 1
        ).then((val) => {
          if (val != 200) {
            this.errorAlert = true;
            this.errorValue =
              "택배 정보를 조회할 수 없습니다. 운송장 번호와 택배사 정보를 다시 확인해 주세요";
            this.removeGradient(this.gradient.length - 1);
          } else {
            this.cleanAll();
          }
        });
        this.errorAlert = false;
      } else {
        this.errorAlert = true;
        this.errorValue = "모든 입력란이 작성되지 않았습니다";
      }
    },
    removeGradient(index: number) {
      this.gradient.splice(index, 1);
      this.$cookies.set("test", JSON.stringify(this.gradient), "30d");
    },
    async getTrackData(companyID: string, TrackID: string, gradientID: number) {
      try {
        const { data, status } = await getTrack(companyID, TrackID);
        this.gradient[gradientID].status = String(data.state.text);
        return status;
      } catch (error) {
        console.log(error);
      }
    },

    async updateTrackData() {
      let num = 0;
      for (const i of this.gradient) {
        await this.getTrackData(i.company, i.code, num);
        num++;
      }
    },
  },
});
</script>
<style scoped>
.input {
  margin-bottom: 10px;
}
</style>
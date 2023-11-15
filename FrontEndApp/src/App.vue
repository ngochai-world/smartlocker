<script>
import {useDBStore} from "@/stores/db.store";

export default {
  data() {
    return {
      apiStore: useDBStore(),
      list: [],
      box: {},
      password: null,
      action: null
    }
  },
  created() {
    !function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://weatherwidget.io/js/widget.min.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'weatherwidget-io-js');
  },
  mounted() {
    this.getListBox()
  },
  methods: {
    async getListBox() {
      this.list = await this.apiStore.list()
    },
    chosenBox(item) {
      this.box = item
      $('.docs-example-modal-xl').modal('show')
    },
    throwIt() {
      if (this.box.status) {
        swal.fire({
          title: 'Box Full!',
          text: 'Vui lòng chọn box khác',
          icon: 'error'
        })
      } else {
        this.action = 'throw'
        this.actionModalFirst('hide')
        this.actionModalPassword('show')
      }
    },
    getIt() {
      if (!this.box.status) {
        swal.fire({
          title: 'Box Trống!',
          text: 'Vui lòng chọn box khác',
          icon: 'error'
        })
      } else {
        this.action = 'get'
        this.actionModalFirst('hide')
        this.actionModalPassword('show')
      }
    },
    actionModalFirst(action) {
      $('.docs-example-modal-xl').modal(action)
    },
    actionModalPassword(action) {
      $('#passwordModal').modal(action)
    },
    confirmPassword(){
      if (this.action == 'throw'){
        this.confirmPasswordThrowIt()
      }
      if (this.action == 'get'){
        this.confirmPasswordGetIt()
      }
    },
    confirmPasswordGetIt() {
      if (this.password == this.box.password){
        swal.fire({
          title: 'Thành Công!',
          text: 'Vui lòng lấy đồ và ấn xác nhận',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: "Xác Nhận"
        }).then(() => {
          swal.fire({
            title: 'Thành Công!',
            text: 'Chúc Bạn có một ngày vui vẻ',
            icon: 'success',
          })
          this.apiStore.edit(this.box.key, {
            key: this.box.key,
            name: this.box.name,
            password: this.box.password,
            status: false
          })
          this.getListBox()
          this.box = {}
          this.password = null
        })
      } else {
        swal.fire({
          title: 'Thất Bại',
          text: 'Mật Khẩu Không Chính Xác',
          icon: 'warning',
        })
      }
    },
    confirmPasswordThrowIt(){
      if (this.password == this.box.password){
        swal.fire({
          title: 'Thành Công!',
          text: 'Vui lòng cất đồ vào và ấn Xác Nhận',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: "Xác Nhận"
        }).then(() => {
                  swal.fire({
            title: 'Thành Công!',
            text: 'Chúc Bạn có một ngày vui vẻ',
            icon: 'success',
          })
          this.apiStore.edit(this.box.key, {
            key: this.box.key,
            name: this.box.name,
            password: this.box.password,
            status: true
          })
          this.getListBox()
          this.box = {}
          this.password = null
        })
      } else {
        swal.fire({
          title: 'Thất Bại',
          text: 'Mật Khẩu Không Chính Xác',
          icon: 'warning',
        })
      }
    }
  }
}
</script>

<template>
  <div class="container-fluid container-application bg-black" style="min-height: 600px; height: 750px">
    <div class="main-content position-relative">
      <div class="page-content" style="padding-top: 20px; padding-bottom: 20px">
        <div class="row">
          <template v-for="item in list">
            <div class="col-xl-4 col-md-4" @click="chosenBox(item)">
              <div class="card card-stats">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h6 class="text-muted mb-1"></h6>
                      <span class="h3 font-weight-bold mb-0">{{ item.name }}</span>
                    </div>
                    <div class="col-auto">
                      <div>
                        <span v-if="item.status == 'none'" class="avatar bg-secondary rounded-circle text-dark">Maintenance</span>
                        <span v-else-if="item.status" class="avatar bg-danger text-white rounded-circle">Full</span>
                        <span v-else class="avatar bg-success text-white rounded-circle">Trống</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="card">
              <a class="weatherwidget-io" href="https://forecast7.com/en/16d05108d07/da-nang/" data-label_1="DA NANG"
                 data-label_2="WEATHER" data-theme="pure">DA NANG WEATHER</a>
            </div>
          </div>
          <div class="col-6">
            <div class="card text-center">
              <div class="cleanslate w24tz-current-time w24tz-middle"
                   style="max-width:100%!important;height: 210px!important;display: inline-block !important; visibility: hidden !important; min-height:145px !important;width: 100%">
                <p>
                  <a href="//24timezones.com/Hanoi/time" style="text-decoration: none" class="clock24"
                     id="tz24-1699944168-c195-eyJob3VydHlwZSI6MTIsInNob3dkYXRlIjoiMSIsInNob3dzZWNvbmRzIjoiMCIsImNvbnRhaW5lcl9pZCI6ImNsb2NrX2Jsb2NrX2NiNjU1MzE2ZThhOTk1NyIsInR5cGUiOiJkYiIsImxhbmciOiJlbiJ9"
                     title="clock Hanoi" target="_blank">Da Nang</a>
                </p>
                <div id="clock_block_cb655316e8a9957"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="modal fade docs-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title h6" id="myExtraLargeModalLabel">{{ box.name }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row d-flex align-items-center justify-content-center">
            <div class="col-auto">
              <button type="button" class="btn btn-xs btn-secondary btn-icon">
                    <span class="btn-inner--icon">
                      <i class="fa-solid fa-boxes-packing"></i>
                    </span>
                <span class="btn-inner--text" @click="getIt">Lấy Đồ</span>
              </button>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-xs btn-secondary btn-icon">
                    <span class="btn-inner--icon">
                      <i class="fa-solid fa-box-open"></i>
                    </span>
                <span class="btn-inner--text" @click="throwIt">Cất Đồ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title h6" id="myExtraLargeModalLabel">Password</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label class="form-control-label">Nhập Password {{ box.name }}</label>
                <input class="form-control" type="password" v-model="password">
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="confirmPassword">Xác Nhận</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card-stats .card-body {
  height: 20vw;
}

.avatar {
  width: 7rem;
  height: 7rem;
}
</style>


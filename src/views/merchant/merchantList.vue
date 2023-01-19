<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <!-- <bs-input v-model="paging.query.merchantId" :placeholder="$t('merchantList.merchantId')" /> -->
        <!-- 商戶名稱 -->
        <bs-select v-model="paging.query.merchantId" :options="merchantList" :placeholder="$t('userList.merchantName')"
          filterable />
        <bs-select v-model="paging.query.isBackendLogin" :options="IsBackendLoginOptions"
          :placeholder="$t('merchantList.isBackendLogin')" />
        <bs-select v-model="paging.query.status" :options="StatusOptions"
          :placeholder="$t('merchantList.merchantStatus')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.MerchantList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.MerchantAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row @sort-change="onSortChange" v-permission="[Permission.MerchantList]" ref="table">
        <el-table-column :label="$t('merchantList.merchant')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <!-- 代理 -->
        <!-- <el-table-column :label="$t('merchantList.agent')">
          <template slot-scope="scope">{{scope.row.parentName}}</template>
        </el-table-column>-->

        <el-table-column :label="$t('merchantList.managerAccount')">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>

        <!-- 商戶ID -->
        <!-- <el-table-column :label="$t('merchantList.username')">
          <template slot-scope="scope">{{scope.row.merchantId}}</template>
        </el-table-column>-->
        <!-- 可用餘額 -->
        <!-- <el-table-column :label="$t('merchantList.balance')">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>-->
        <!-- 不可用餘額 -->
        <!-- <el-table-column :label="$t('merchantList.freezeAmount')">
          <template slot-scope="scope">{{scope.row.frozenAmount | money}}</template>
        </el-table-column>-->

        <!-- 優惠狀態 -->
        <!-- <el-table-column :label="$t('merchantList.discountStatus')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.discountStatus" @on-click-submit="changeDiscountStatus(scope.row, $event)"
                       v-permission="[Permission.MerchantUpdateStatus]"/>
          </template>
        </el-table-column>-->
        <el-table-column :label="$t('timestamp.createTime')" sortable="custom" prop="m.CreateTime">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>

        <el-table-column :label="$t('timestamp.updateTime')" sortable="custom" prop="m.UpdateTime">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>

        <!-- 是否后台可登 -->
        <el-table-column :label="$t('merchantList.isBackendLogin')">
          <template slot-scope="scope">
            <bs-backend-login-status :status="scope.row.isBackendLogin"
              @on-click-submit="changeBackendLoginStatus(scope.row, $event)" />
          </template>
        </el-table-column>

        <el-table-column :label="$t('merchantList.merchantStatus')">
          <template slot-scope="scope">
            <bs-status :memo="scope.row.memo" :status="scope.row.status"
              @on-click-submit="changeStatus(scope.row, $event)" v-permission="[Permission.MerchantUpdateStatus]" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.MerchantUpdate]" />
          </template>
        </el-table-column>
      </el-table>
      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />
      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="95%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="130px">
          <!-- 商戶名稱(不顯示) -->
          <el-form-item :label="$t('merchantList.merchant')" prop="merchantName" v-if="dialogType===DialogType.Create">
            <bs-input v-model="formData.merchantName" />
          </el-form-item>

          <!-- <el-form-item
            :label="$t('merchantList.merchantId')"
            prop="merchantId"
            v-if="dialogType===DialogType.Create"
          >
            <bs-input
              v-model="formData.merchantId"
            />
          </el-form-item>-->

          <el-form-item :label="$t('merchantList.managerAccount')" prop="username"
            v-if="dialogType===DialogType.Create">
            <bs-input v-model="formData.username" />
          </el-form-item>

          <el-form-item :label="$t('merchantList.managerPassword')" prop="password">
            <div v-if="dialogType===DialogType.Update">
              <bs-button :title="$t('merchantList.resetPassword')" v-if="!resetPasswordVisiable"
                @click="showResetPassword" />
              <bs-input type="password" v-model="formData.password" :placeholder="$t('merchantList.managerPassword')"
                v-if="resetPasswordVisiable" />
            </div>
            <div v-else>
              <bs-input type="password" v-model="formData.password" :placeholder="$t('userList.passwordPlaceholder')" />
            </div>
          </el-form-item>

          <el-form-item :label="$t('merchantList.managerNickname')" prop="nickname"
            v-if="dialogType===DialogType.Create">
            <bs-input v-model="formData.nickname" :placeholder="$t('merchantList.nicknamePlaceholder')" />
          </el-form-item>

          <!-- 代理 -->
          <!-- <el-form-item :label="$t('merchantList.agent')"
                        prop="parentId"
                        v-if="dialogType===DialogType.Create&&$store.getters.user.level===UserLevel.SuperAdmin">
            <bs-select v-model="formData.parentId" :options="childAgentList" :clearable="false"/>
          </el-form-item>-->

          <!-- 渠道費率 -->
          <!-- <el-form-item :label="$t('merchantList.channelRate')" prop="channelList">

            <el-table :data="channelSettlementList" border fit highlight-current-row>
              <el-table-column :label="$t('accountList.channel')">
                <template slot-scope="scope">
                  <el-checkbox :label="scope.row.channelId"
                               v-model="formData.merchantSettlementList[scope.$index].status">
                    {{scope.row.channelName}}
                  </el-checkbox>
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.chargefee')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].rateDifference"
                            :placeholder="$t('merchantList.rate')" width="100px"/>
                  % + {{formData.merchantSettlementList[scope.$index].baseRate}} %
                  = <b>{{computeTotalRate(formData.merchantSettlementList[scope.$index])}} %</b><br/>
                  +<br/>
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].rateFixedAmountDifference"
                            :placeholder="$t('merchantList.rateFixedAmountPlaceholder')" width="100px"/>
                  + {{formData.merchantSettlementList[scope.$index].baseRateFixedAmount}}
                  = <b>{{computeTotalFixedRateAmount(formData.merchantSettlementList[scope.$index])}}</b>
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.settlement')">
                <template slot-scope="scope">
                  <bs-select v-model="formData.merchantSettlementList[scope.$index].settlementId"
                             :options="scope.row.settlementList" width="100%"/>
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.payAmount')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].minAmount"
                            :placeholder="$t('merchantList.payAmountFrom')" width="80%"/>
                  ~
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].maxAmount"
                            :placeholder="$t('merchantList.payAmountTo')" width="80%"/>
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.servicefee')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].serviceFeeRate"
                            :placeholder="$t('merchantList.rate')" width="100px"/>
                  % + {{formData.merchantSettlementList[scope.$index].baseServiceRate}} %
                  = <b>{{computeTotalServiceFeeRate(formData.merchantSettlementList[scope.$index])}} %</b><br/>
                  +<br/>
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].serviceFee"
                            :placeholder="$t('merchantList.rateFixedAmountPlaceholder')" width="100px"/>
                  + {{formData.merchantSettlementList[scope.$index].baseServiceFee}}
                  = <b>{{computeTotalServiceFee(formData.merchantSettlementList[scope.$index])}}</b>
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.dayMaxAmount')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].dayMaxAmount" width="100%"/>
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.dayMaxCount')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].dayMaxCount" width="100%"/>
                </template>
              </el-table-column>

            </el-table>

          </el-form-item>-->

          <!-- 優惠 -->
          <!-- <el-form-item :label="$t('merchantList.discountStatus')" prop="discountStatus">
            <bs-switch v-model="formData.discountStatus"/>
          </el-form-item>-->

          <!-- email -->
          <!-- <el-form-item :label="$t('merchantList.email')" prop="email">
            <bs-input v-model="formData.email" />
          </el-form-item>-->

          <!-- 手機 -->
          <!-- <el-form-item :label="$t('merchantList.mobile')" prop="mobile">
            <bs-input v-model="formData.mobile" />
          </el-form-item>-->

          <!-- 是否后台可登 -->
          <el-form-item :label="$t('merchantList.isBackendLogin')" prop="isBackendLogin">
            <bs-select v-model="formData.isBackendLogin" :options="IsBackendLoginOptions" :clearable="false" />
          </el-form-item>

          <el-form-item :label="$t('merchantList.merchantStatus')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" :clearable="false" />
          </el-form-item>

          <!-- requestKey -->
          <el-form-item :label="$t('merchantList.requestKey')" prop="reqKey" v-if="dialogType===DialogType.Update">
            <bs-input v-model="formData.requestKey" disabled />
            <bs-button v-if="dialogType===DialogType.Update" :title="$t('merchantList.regenerate')"
              @click="handleGenerateRequestKey" style="margin-left: 10px;" />
          </el-form-item>

          <!-- <el-form-item :label="$t('table.memo')" :prop="dialogType===DialogType.Update?'memo':undefined">
            <bs-text-area v-model="formData.memo"/>
          </el-form-item>-->
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible=false" />
          <bs-submit-button v-if="dialogType===DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>

      <el-dialog :title="$t('merchantList.addSuccessTitle')" :visible.sync="addResultDialogFormVisible"
        v-if="addResultDialogFormVisible" width="70%">
        <el-form label-position="left" label-width="120px">
          <el-form-item :label="$t('merchantList.merchant')">{{this.addedResult.merchant.merchantId}}</el-form-item>
          <el-form-item :label="$t('merchantList.requestKey')" style="word-break: break-all">
            {{this.addedResult.merchant.requestKey}}</el-form-item>
          <el-form-item :label="$t('merchantList.loginUrl')">{{loginUrl}}</el-form-item>
          <el-form-item :label="$t('merchantList.loginUsername')">{{this.addedResult.username}}</el-form-item>
          <el-form-item :label="$t('merchantList.loginPassword')">{{this.addedResult.password}}</el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-button :title="$t('table.copy')" v-clipboard:copy="addedResultText" />
          <bs-submit-button id="copyResult" :data-clipboard-text="addedResultText" @click="closeAddResult" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard'
import { DialogType, Permission, Status, UserLevel } from '@/definitions/constants'
import {
  addMerchant,
  generateRequestKey,
  getChildAgentList,
  getMerchantList,
  updateMerchant,
  updateMerchantStatus,
  updateBackendLoginStatus
} from '@/api/merchant'
import {
  DialogTypeOptions,
  // findSettlementClosingName,
  SettlementClosingDayOptions,
  SettlementPercentageOptions,
  StatusOptions,
  IsBackendLoginOptions,
  findOptionById
} from '@/definitions/options'
import { deepClone, objectMerge } from '@/utils'
import { Rules, Regex } from '@/definitions/fieldCheck'
import { moneyToCent, moneyToDollar } from '@/utils/money'
import { Message } from 'element-ui'
import { getChannelBaseRate } from '@/api/channel'
import { getMerchantIndexingAll } from '@/api/indexing'
import { isSuperAdminLevel } from '@/utils/user'

export default {
  name: 'merchantList',
  directives: {
    clipboard
  },
  data() {
    return {
      UserLevel,
      Permission,
      addResultDialogFormVisible: false,
      dialogFormVisible: false,
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: undefined
        }
      },
      rules: {
        parentId: [...Rules.requiredChange, ...Rules.name],
        merchantName: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            pattern: Regex.enNum,
            message: this.$t('rules.onlyEnAndNum')
          },
          { trigger: 'blur', min: 2, max: 12, message: this.$t('rules.twoToTwelveLength') }
        ],
        nickname: [...Rules.name],
        // merchantId: [...Rules.requiredBlur, ...Rules.merchantId],
        merchantId: [...Rules.requiredBlur, ...Rules.noSpace],
        email: [...Rules.email],
        loginPassword: [...Rules.requiredBlur, ...Rules.password],
        transactionPassword: [...Rules.requiredBlur, ...Rules.password],
        mobile: [...Rules.mobile],
        username: [...Rules.requiredBlur, ...Rules.username],
        password: [...Rules.password],
        status: [...Rules.requiredChange],
        isBackendLogin: [...Rules.requiredChange],
        memo: [...Rules.memo]
      },
      StatusOptions,
      SettlementPercentageOptions,
      SettlementClosingDayOptions,
      IsBackendLoginOptions,
      defaultFormData: {
        username: undefined,
        status: Status.Enabled,
        isBackendLogin: Status.Enabled,
        channelSettlementList: [],
        merchantSettlementList: []
      },
      formData: {},
      list: [],
      childAgentList: [],
      channelSettlementList: [],
      merchantSettlementList: [],
      loginUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
      addedResult: {
        merchant: {}
      },
      addedResultText: undefined,
      merchantList: [],
      // 重置密碼顯示
      resetPasswordVisiable: false
    }
  },
  created() {
    if (this.$route.query.merchantId) {
      this.paging.query.merchantId = this.$route.query.merchantId
    }
    this.queryMerchantOption()
    this.getList()
    this.queryChannelSettlement()
  },
  watch: {
    $route(to, from) {
      if (from.query.merchantId !== to.query.merchantId) {
        this.paging.query.merchantId = to.query.merchantId
        this.getList()
      }
    }
  },
  methods: {
    queryMerchantOption() {
      getMerchantIndexingAll().then(response => {
        this.merchantList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
      })
    },
    // 切換重置密碼 button 改 input
    showResetPassword() {
      this.resetPasswordVisiable = true
      this.rules.password = [...Rules.password, ...Rules.requiredBlur]
    },
    getList(sorting = false) {
      if (!sorting && this.$refs.table) {
        delete this.paging.query.sort
        this.$refs.table.clearSort()
      }
      this.paging.isLoading = true
      // sort 字串更新，只有商戶列表這邊需要這樣做替換
      const { sort } = this.paging.query
      if (sort) {
        this.paging.query.sort = sort.replace(/,/g, ' ')
      }

      getMerchantList(this.paging.query).then(response => {
        if (response.content) {
          response.content.forEach(res => {
            res.balance = moneyToDollar(res.balance)
            res.frozenAmount = moneyToDollar(res.frozenAmount)

            if (res.channelSettlementList) {
              res.channelSettlementList.forEach(settlement => {
                settlement.rateFixedAmountDifference = moneyToDollar(settlement.rateFixedAmountDifference)
                settlement.minAmount = moneyToDollar(settlement.minAmount)
                settlement.maxAmount = moneyToDollar(settlement.maxAmount)
                settlement.dayMaxAmount = moneyToDollar(settlement.dayMaxAmount)
                settlement.todayAmount = moneyToDollar(settlement.todayAmount)
                settlement.totalAmount = moneyToDollar(settlement.totalAmount)
                settlement.serviceFee = moneyToDollar(settlement.serviceFee)
              })
            }
          })
        }
        this.list = response.content
        this.paging.totalElements = response.totalElements
        this.paging.isLoading = false
      })
    },
    handleSizeChange(val) {
      this.paging.query.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.paging.query.page = val
      this.getList(true)
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getStatus(status) {
      return findOptionById(StatusOptions, status).name
    },
    // 是否后台可登
    changeBackendLoginStatus(row, { isBackendLogin, memo }) {
      const data = {
        merchantId: row.merchantId,
        isBackendLogin
      }
      updateBackendLoginStatus(data).then(this.getList)
    },
    changeStatus(row, { status, memo }) {
      const data = {
        merchantId: row.merchantId,
        status,
        memo
      }
      updateMerchantStatus(data).then(this.getList)
    },
    changeDiscountStatus(row, { status, memo }) {
      const data = {
        merchantId: row.merchantId,
        discountStatus: status,
        memo
      }
      updateMerchantStatus(data).then(this.getList)
    },
    handleGenerateRequestKey() {
      generateRequestKey().then(response => {
        this.formData.requestKey = response.requestKey
      })
    },
    handleCreate() {
      this.queryChildAgentList()
      this.formData = deepClone(this.defaultFormData)
      this.setMerchantSettlementList()
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create

      this.resetPasswordVisiable = false
      this.rules.password = [...Rules.password]
    },
    handleModify(row) {
      this.queryChildAgentList()
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.setMerchantSettlementList()
      this.setUserMerchantSettlementList()
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update

      this.resetPasswordVisiable = false
      this.rules.password = [...Rules.password]
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        // 渠道費率欄位移除，不需要驗證checkMerchantSettlementList
        // if (valid && this.checkMerchantSettlementList()) {
        if (valid) {
          this.normalizeMerchantSettlementList()

          const { nickname, merchantName } = this.formData
          // 如为空值，预设与商户名称相同
          if (nickname === '' || nickname === null || nickname === undefined) {
            this.formData.nickname = this.formData.merchantName
          }

          // default  merchantId = merchantName
          this.formData.merchantId = merchantName

          addMerchant(this.formData).then(response => {
            this.queryMerchantOption()
            this.addedResult = response
            this.addResultDialogFormVisible = true

            this.addedResultText =
              this.$t('merchantList.merchantId') +
              ' : ' +
              response.merchant.merchantId +
              '\n' +
              this.$t('merchantList.requestKey') +
              ' : ' +
              response.merchant.requestKey +
              '\n' +
              this.$t('merchantList.loginUrl') +
              ' : ' +
              this.loginUrl +
              '\n' +
              this.$t('merchantList.loginUsername') +
              ' : ' +
              response.username +
              '\n' +
              this.$t('merchantList.loginPassword') +
              ' : ' +
              response.password
          })
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        // 渠道費率欄位移除，不需要驗證checkMerchantSettlementList
        // if (valid && this.checkMerchantSettlementList()) {
        if (valid) {
          this.normalizeMerchantSettlementList()
          updateMerchant(this.formData).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    normalizeMerchantSettlementList() {
      // this.formData.merchantSettlementList = this.formData.merchantSettlementList.filter(merchantSettlement =>
      //   merchantSettlement.status && merchantSettlement.settlementId && merchantSettlement.rateDifference
      // ).map(settlement => {
      //   settlement.status = settlement.status ? 1 : 0
      //   settlement.rateFixedAmountDifference = moneyToCent(settlement.rateFixedAmountDifference)
      //   settlement.minAmount = moneyToCent(settlement.minAmount)
      //   settlement.maxAmount = moneyToCent(settlement.maxAmount)
      //   settlement.dayMaxAmount = moneyToCent(settlement.dayMaxAmount)
      //   settlement.serviceFee = moneyToCent(settlement.serviceFee)
      //   return settlement
      // })

      // 因費率與服務費欄位隱藏，故不需要判斷
      this.formData.merchantSettlementList = this.formData.merchantSettlementList
        .filter(merchantSettlement => merchantSettlement.status && merchantSettlement.settlementId)
        .map(settlement => {
          settlement.status = settlement.status ? 1 : 0
          settlement.rateFixedAmountDifference = moneyToCent(settlement.rateFixedAmountDifference)
          settlement.minAmount = moneyToCent(settlement.minAmount)
          settlement.maxAmount = moneyToCent(settlement.maxAmount)
          settlement.dayMaxAmount = moneyToCent(settlement.dayMaxAmount)
          settlement.serviceFee = moneyToCent(settlement.serviceFee)
          return settlement
        })
    },
    checkMerchantSettlementList() {
      // 至少選擇一筆
      const { merchantSettlementList } = this.formData
      // 濾出有勾選的的渠道
      const chanelCheckedList = merchantSettlementList.filter(o => o.status === true)
      // 至少要选择一笔渠道
      if (chanelCheckedList.length < 1) {
        return this.showErrorMessage(this.$t('merchantList.rules.channelEmpty'))
      }

      for (const settlement of chanelCheckedList) {
        if (!settlement.status) {
          continue
        }

        // 结算
        if (settlement.settlementId === undefined || settlement.settlementId === null) {
          return this.showErrorMessage(this.$t('merchantList.rules.settlementIdEmpty'))
        }
        // 单笔限额
        if (isNaN(parseInt(settlement.minAmount)) || isNaN(parseInt(settlement.maxAmount))) {
          // 輸入不是數字
          return this.showErrorMessage(this.$t('merchantList.rules.minMaxAmountNotNumber'))
        }

        // 单笔限额-下限範圍
        if (parseInt(settlement.minAmount) > 1000000 || parseInt(settlement.minAmount) < 1) {
          return this.showErrorMessage(this.$t('merchantList.rules.minAmountLength'))
        }

        // 单笔限额-上限範圍
        if (parseInt(settlement.maxAmount) > 1000000 || parseInt(settlement.maxAmount) < 1) {
          return this.showErrorMessage(this.$t('merchantList.rules.maxAmountLength'))
        }

        // 单笔限额-下限大於上限
        if (parseInt(settlement.minAmount) > parseInt(settlement.maxAmount)) {
          return this.showErrorMessage(this.$t('merchantList.rules.minGTRMaxAmount'))
        }

        // 费率、费率固定金额，初始化已有給 default 0
        if (isNaN(parseFloat(settlement.rateDifference)) || isNaN(parseFloat(settlement.rateFixedAmountDifference))) {
          return this.showErrorMessage(this.$t('merchantList.rules.rateNotNumber'))
        }

        // 单日限额
        if (isNaN(parseInt(settlement.dayMaxAmount))) {
          return this.showErrorMessage(this.$t('merchantList.rules.dayMaxAmountNotNumber'))
        }

        // 单日限额 1~1000000
        if (parseInt(settlement.dayMaxAmount) > 1000000 || parseInt(settlement.dayMaxAmount) < 1) {
          return this.showErrorMessage(this.$t('merchantList.rules.dayMaxAmountLength'))
        }

        // 单日限额不可以小于单笔最高限额
        if (parseInt(settlement.dayMaxAmount) < parseInt(settlement.maxAmount)) {
          return this.showErrorMessage(this.$t('merchantList.rules.dayMaxLargerThanMax'))
        }

        // 单笔最高限额不可以小于单笔最小限额
        if (parseInt(settlement.maxAmount) < parseInt(settlement.minAmount)) {
          return this.showErrorMessage(this.$t('merchantList.rules.minLargerThanMax'))
        }

        // 单日限笔
        if (isNaN(parseInt(settlement.dayMaxCount))) {
          return this.showErrorMessage(this.$t('merchantList.rules.dayMaxCountNotNumber'))
        }

        // 单日限笔 0~10
        if (parseInt(settlement.dayMaxCount) > 10 || parseInt(settlement.dayMaxCount) < 0) {
          return this.showErrorMessage(this.$t('merchantList.rules.dayMaxCountLength'))
        }
      }
      return true
    },
    showErrorMessage(message) {
      Message({
        message,
        type: 'error',
        duration: 5 * 1000
      })
      return false
    },
    closeAddResult() {
      this.getList()
      this.addResultDialogFormVisible = false
    },
    verifySettlementList() {
      for (const settlement of this.formData.settlementList) {
        const sum = settlement.percentage1 + settlement.percentage2
        if (sum !== 100 && sum !== 0) {
          this.$message({
            message: this.$t('channelList.rules.settlementSum'),
            type: 'warning'
          })
          return false
        }
      }
      return true
    },
    queryChildAgentList() {
      if (isSuperAdminLevel(this.$store)) {
        getChildAgentList().then(response => {
          this.childAgentList = response.map(res => ({ id: res.merchantId, name: res.merchantName }))
          if (this.childAgentList && this.childAgentList.length > 0) {
            this.formData.parentId = this.childAgentList[0].id
          }
        })
      }
    },
    queryChannelSettlement() {
      // getChannelSettlement().then(response => {
      //   this.channelSettlementList = response.map(channelSettlement => {
      //     if (channelSettlement.settlementList) {
      //       channelSettlement.settlementList = channelSettlement.settlementList.map(settlement => {
      //         return {
      //           id: settlement.settlementId,
      //           name:
      //             settlement.percentage1 +
      //             '% ' +
      //             findSettlementClosingName(settlement.closingDay1) +
      //             ' + ' +
      //             settlement.percentage2 +
      //             '% ' +
      //             findSettlementClosingName(settlement.closingDay2)
      //         }
      //       })
      //     }
      //     return channelSettlement
      //   })
      // })
    },
    setMerchantSettlementList() {
      this.formData.merchantSettlementList = this.channelSettlementList.map(channelSettlement => ({
        status: false,
        channelId: channelSettlement.channelId,
        channelCode: channelSettlement.channelCode,
        baseRate: 0.0,
        baseRateFixedAmount: 0,
        baseServiceRate: 0.0,
        baseServiceFee: 0,
        // 因將費率與服務費隱藏，需要有 default 值
        serviceFee: 0,
        serviceFeeRate: 0,
        rateDifference: 0,
        rateFixedAmountDifference: 0
      }))

      this.formData.merchantSettlementList.forEach(merchantSettlementList => {
        if (this.formData.parentId) {
          const params = {
            channelId: merchantSettlementList.channelId,
            merchantId: this.formData.parentId
          }
          getChannelBaseRate(params).then(response => {
            if (!response) {
              return
            }
            const merchantSettlement = this.formData.merchantSettlementList.find(
              merchantSettlement => merchantSettlement.channelId === response.channelId
            )
            merchantSettlement.baseRate = response.rate
            merchantSettlement.baseRateFixedAmount = moneyToDollar(response.rateFixedAmount)
            merchantSettlement.baseServiceRate = response.serviceBaseRate
            merchantSettlement.baseServiceFee = moneyToDollar(response.serviceFee)
          })
        } else {
          const merchantSettlement = this.formData.merchantSettlementList.find(
            merchantSettlement => merchantSettlement.channelId === merchantSettlementList.channelId
          )
          merchantSettlement.baseRate = 0
          merchantSettlement.baseRateFixedAmount = 0
          merchantSettlement.baseServiceRate = 0
          merchantSettlement.baseServiceFee = 0
        }
      })
    },
    setUserMerchantSettlementList() {
      this.formData.merchantSettlementList.forEach(value => {
        this.formData.channelSettlementList
          .filter(userSettlement => userSettlement.channelId === value.channelId)
          .forEach(userSettlement => {
            value.status = true
            value.settlementId = userSettlement.settlementId
            this.$set(value, 'rateDifference', userSettlement.rateDifference)
            this.$set(value, 'rateFixedAmountDifference', userSettlement.rateFixedAmountDifference)
            value.minAmount = userSettlement.minAmount
            value.maxAmount = userSettlement.maxAmount
            value.dayMaxAmount = userSettlement.dayMaxAmount
            value.serviceFee = userSettlement.serviceFee
            value.serviceFeeRate = userSettlement.serviceFeeRate
            value.dayMaxCount = userSettlement.dayMaxCount
            value.channelId = userSettlement.channelId
            value.channelCode = userSettlement.channelCode
          })
      })
    },
    computeTotalRate(merchantSettlement) {
      const total = (parseFloat(merchantSettlement.rateDifference) || 0) + parseFloat(merchantSettlement.baseRate)
      return total.toFixed(2)
    },
    computeTotalServiceFeeRate(merchantSettlement) {
      const total =
        (parseFloat(merchantSettlement.serviceFeeRate) || 0) + parseFloat(merchantSettlement.baseServiceRate)
      return total.toFixed(2)
    },
    computeTotalServiceFee(merchantSettlement) {
      const total = (parseFloat(merchantSettlement.serviceFee) || 0) + parseFloat(merchantSettlement.baseServiceFee)
      return total.toFixed(2)
    },
    computeTotalFixedRateAmount(merchantSettlement) {
      const total =
        (parseFloat(merchantSettlement.rateFixedAmountDifference) || 0) +
        parseFloat(merchantSettlement.baseRateFixedAmount)
      return total.toFixed(2)
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList(true)
      }
    }
  }
}
</script>

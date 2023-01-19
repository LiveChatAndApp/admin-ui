<template>

  <div class="app-container calendar-list-container">

    <div class="filter-container">
      <div class="filter-container">
        <bs-input v-model="paging.query.merchantId" :placeholder="$t('agentList.agentId')" />
        <bs-select v-model="paging.query.status" :options="StatusOptions" :placeholder="$t('merchantList.status')" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.AgentList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.AgentAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%" v-permission="[Permission.AgentList]">
        <el-table-column :label="$t('agentList.agentName')">
          <template slot-scope="scope">{{scope.row.merchantName}}</template>
        </el-table-column>
        <el-table-column :label="$t('userList.username')">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.agentId')">
          <template slot-scope="scope">{{scope.row.merchantId}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.parentAgentName')">
          <template slot-scope="scope">{{scope.row.parentName}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.balance')">
          <template slot-scope="scope">{{scope.row.balance}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.freezeAmount')">
          <template slot-scope="scope">{{scope.row.frozenAmount}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.merchantCount')">
          <template slot-scope="scope">
            <span @click="onClickAgentCount(scope.row)" style="color: blue; cursor: pointer;">
              {{scope.row.childList.length}}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('agentList.loginIp')">
          <template slot-scope="scope">{{scope.row.user.loginIp}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.lastLoginTime')">
          <template slot-scope="scope">{{scope.row.user.loginTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('timestamp.createTime')">
          <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-status :status="scope.row.status" @on-click-submit="changeStatus(scope.row, $event)"
              v-permission="[Permission.AgentUpdateStatus]" />
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
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.AgentUpdate]" />
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="$t('merchantList.merchant')" :visible.sync="merchantListVisible" :close-on-click-modal="false"
        :show-close="true" width="50%">
        <el-table :data="childMerchantList" v-loading="paging.isLoading" border fit highlight-current-row
          style="width: 100%">
          <el-table-column :label="$t('merchantList.username')">
            <template slot-scope="scope">{{scope.row.merchantId}}</template>
          </el-table-column>
          <el-table-column :label="$t('merchantList.merchant')">
            <template slot-scope="scope">{{scope.row.merchantName}}</template>
          </el-table-column>
          <el-table-column :label="$t('timestamp.createTime')">
            <template slot-scope="scope">{{scope.row.createTime | moment}}</template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="90%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="130px">
          <el-form-item :label="$t('agentList.agentName')" prop="merchantName">
            <bs-input v-model="formData.merchantName" />
          </el-form-item>

          <el-form-item :label="$t('merchantList.channelRate')" prop="channelList">

            <el-table :data="channelSettlementList" border fit highlight-current-row>
              <el-table-column :label="$t('accountList.channel')">
                <template slot-scope="scope">
                  <el-checkbox :label="scope.row.channelId"
                    v-model="formData.merchantSettlementList[scope.$index].status">
                    {{scope.row.channelName}}
                  </el-checkbox>
                </template>
              </el-table-column>

              <!-- 費率 -->
              <!-- <el-table-column :label="$t('merchantList.rate')">
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
              </el-table-column> -->

              <el-table-column :label="$t('merchantList.settlement')">
                <template slot-scope="scope">
                  <bs-select v-model="formData.merchantSettlementList[scope.$index].settlementId"
                    :options="scope.row.settlementList" width="100%" />
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.payAmount')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].minAmount"
                    :placeholder="$t('merchantList.payAmountFrom')" width="80%" />
                  ~
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].maxAmount"
                    :placeholder="$t('merchantList.payAmountTo')" width="80%" />
                </template>
              </el-table-column>

              <!-- 服務費 -->
              <!-- <el-table-column :label="$t('merchantList.servicefee')">
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
              </el-table-column> -->

              <el-table-column :label="$t('merchantList.dayMaxAmount')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].dayMaxAmount" width="100%" />
                </template>
              </el-table-column>

              <el-table-column :label="$t('merchantList.dayMaxCount')">
                <template slot-scope="scope">
                  <bs-input v-model="formData.merchantSettlementList[scope.$index].dayMaxCount" width="100%" />
                </template>
              </el-table-column>

            </el-table>

          </el-form-item>

          <el-form-item :label="$t('merchantList.mobile')" prop="mobile">
            <bs-input v-model="formData.mobile" />
          </el-form-item>
          <el-form-item :label="$t('merchantList.email')" prop="email">
            <bs-input v-model="formData.email" />
          </el-form-item>
          <el-form-item :label="$t('merchantList.adminAccount')" prop="username" v-if="dialogType===DialogType.Create">
            <bs-input v-model="formData.username" />
          </el-form-item>
          <el-form-item :label="$t('merchantList.adminPassword')" prop="password" v-if="dialogType===DialogType.Create">
            <bs-input v-model="formData.password" :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>

          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="StatusOptions" />
          </el-form-item>

          <!-- <el-form-item :label="$t('table.memo')" :prop="dialogType===DialogType.Update?'memo':undefined">
            <bs-text-area v-model="formData.memo"/>
          </el-form-item> -->
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

      <el-dialog :title="$t('agentList.addSuccessTitle')" :visible.sync="addResultDialogFormVisible"
        v-if="addResultDialogFormVisible" width="70%">
        <el-form label-position="left" label-width="120px">
          <el-form-item :label="$t('merchantList.loginUrl')">
            {{loginUrl}}
          </el-form-item>
          <el-form-item :label="$t('merchantList.loginUsername')">
            {{this.addedResult.username}}
          </el-form-item>
          <el-form-item :label="$t('merchantList.loginPassword')">
            {{this.addedResult.password}}
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-button :title="$t('table.copy')" v-clipboard:copy='addedResultText' />
          <bs-submit-button id="copyResult" :data-clipboard-text="addedResultText" @click="closeAddResult" />
        </div>
      </el-dialog>

    </div>

  </div>

</template>

<script>
  import clipboard from '@/directive/clipboard'
  import { addAgent, getAgentList, updateAgent, updateAgentStatus } from '@/api/agent'
  import { DialogType, Permission, Status } from '@/definitions/constants'
  import { DialogTypeOptions, findSettlementClosingName, StatusOptions } from '@/definitions/options'
  import { deepClone, objectMerge } from '@/utils'
  import { Rules } from '@/definitions/fieldCheck'
  import { moneyToCent, moneyToDollar } from '@/utils/money'
  import { Message } from 'element-ui'
  import { getChannelBaseRate, getChannelSettlement } from '@/api/channel'

  export default {
    name: 'agentList',
    directives: {
      clipboard
    },
    data() {
      return {
        Permission,
        addResultDialogFormVisible: false,
        dialogFormVisible: false,
        merchantListVisible: false,
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
          merchantName: [
            ...Rules.requiredBlur,
            ...Rules.name
          ],
          email: [
            ...Rules.email
          ],
          loginPassword: [
            ...Rules.requiredBlur,
            ...Rules.password
          ],
          transactionPassword: [
            ...Rules.requiredBlur,
            ...Rules.password
          ],
          mobile: [
            ...Rules.mobile
          ],
          username: [
            ...Rules.requiredBlur,
            ...Rules.username
          ],
          password: [
            ...Rules.password
          ],
          status: [
            ...Rules.requiredChange
          ],
          memo: [
            ...Rules.memo
          ]
        },
        StatusOptions,
        defaultFormData: {
          username: undefined,
          status: Status.Enabled,
          channelSettlementList: [],
          merchantSettlementList: []
        },
        formData: {},
        list: [],
        channelSettlementList: [],
        merchantSettlementList: [],
        childMerchantList: [],
        loginUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
        addedResult: {
          merchant: {}
        },
        addedResultText: undefined
      }
    },
    created() {
      this.getList()
      this.queryChannelSettlement()
    },
    methods: {
      getList() {
        this.paging.isLoading = true
        getAgentList(this.paging.query).then(response => {
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
                  settlement.serviceFee = moneyToCent(settlement.serviceFee)
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
        this.getList()
      },
      handleSearch() {
        this.paging.query.page = 0
        this.getList()
      },
      changeStatus(row, { status, memo }) {
        const data = {
          merchantId: row.merchantId,
          status,
          memo
        }
        updateAgentStatus(data).then(this.getList)
      },
      handleCreate() {
        this.formData = deepClone(this.defaultFormData)
        this.setMerchantSettlementList()
        this.dialogFormVisible = true
        this.dialogType = DialogType.Create
      },
      handleModify(row) {
        this.formData = objectMerge(deepClone(this.defaultFormData), row)
        this.setMerchantSettlementList()
        this.setUserMerchantSettlementList(row)
        this.dialogFormVisible = true
        this.dialogType = DialogType.Update
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid && this.checkMerchantSettlementList()) {
            this.normalizeMerchantSettlementList()
            addAgent(this.formData).then(response => {
              this.addedResult = response
              this.addResultDialogFormVisible = true

              this.addedResultText = this.$t('merchantList.loginUrl') + ' : ' + this.loginUrl + '\n' +
                this.$t('merchantList.loginUsername') + ' : ' + response.username + '\n' +
                this.$t('merchantList.loginPassword') + ' : ' + response.password
            })
            this.dialogFormVisible = false
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid && this.checkMerchantSettlementList()) {
            this.normalizeMerchantSettlementList()
            updateAgent(this.formData).then(() => {
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
        this.formData.merchantSettlementList = this.formData.merchantSettlementList.filter(merchantSettlement =>
          merchantSettlement.status && merchantSettlement.settlementId
        ).map(settlement => {
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
        const chanelCheckedList = merchantSettlementList.filter((o) => o.status === true)
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
            // 因費率與服務費欄位隱藏，故不需要判斷
            // return this.showErrorMessage(this.$t('merchantList.rules.rateNotNumber'))
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

          // if (parseInt(settlement.dayMaxAmount) < parseInt(settlement.maxAmount)) {
          //   Message({
          //     message: this.$t('merchantList.rules.dayMaxLargerThanMax'),
          //     type: 'error',
          //     duration: 5 * 1000
          //   })
          //   return false
          // } else if (parseInt(settlement.maxAmount) < parseInt(settlement.minAmount)) {
          //   Message({
          //     message: this.$t('merchantList.rules.minLargerThanMax'),
          //     type: 'error',
          //     duration: 5 * 1000
          //   })
          //   return false
          // }
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
      queryChannelSettlement() {
        getChannelSettlement().then(response => {
          this.channelSettlementList = response.map(channelSettlement => {
            if (channelSettlement.settlementList) {
              channelSettlement.settlementList = channelSettlement.settlementList.map(settlement => {
                return {
                  id: settlement.settlementId,
                  name: settlement.percentage1 + '% ' + findSettlementClosingName(settlement.closingDay1) + ' + ' + settlement.percentage2 + '% ' + findSettlementClosingName(settlement.closingDay2)
                }
              })
            }
            return channelSettlement
          })
        })
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
              const merchantSettlement = this.formData.merchantSettlementList
                .find(merchantSettlement => merchantSettlement.channelId === response.channelId)
              merchantSettlement.baseRate = response.rate
              merchantSettlement.baseRateFixedAmount = moneyToDollar(response.rateFixedAmount)
              merchantSettlement.baseServiceRate = response.serviceBaseRate
              merchantSettlement.baseServiceFee = moneyToDollar(response.serviceFee)
            })
          } else {
            const merchantSettlement = this.formData.merchantSettlementList
              .find(merchantSettlement => merchantSettlement.channelId === merchantSettlementList.channelId)
            merchantSettlement.baseRate = 0
            merchantSettlement.baseRateFixedAmount = 0
            merchantSettlement.baseServiceRate = 0
            merchantSettlement.baseServiceFee = 0
          }
        })
      },
      setUserMerchantSettlementList(row) {
        this.formData.merchantSettlementList
          .map(value => {
            row.channelSettlementList.filter(userSettlement => userSettlement.channelId === value.channelId)
              .map(userSettlement => {
                value.status = true
                value.settlementId = userSettlement.settlementId
                this.$set(value, 'rateDifference', userSettlement.rateDifference)
                this.$set(value, 'rateFixedAmountDifference', userSettlement.rateFixedAmountDifference)
                value.minAmount = userSettlement.minAmount
                value.maxAmount = userSettlement.maxAmount
                value.dayMaxAmount = userSettlement.dayMaxAmount
                value.serviceFee = userSettlement.serviceFee
                value.dayMaxCount = userSettlement.dayMaxCount
                value.channelId = userSettlement.channelId
                value.channelCode = userSettlement.channelCode
              })
          })
      },
      computeTotalRate(merchantSettlement) {
        return (parseFloat(merchantSettlement.rateDifference) || 0) + parseFloat(merchantSettlement.baseRate)
      },
      computeTotalFixedRateAmount(merchantSettlement) {
        return (parseFloat(merchantSettlement.rateFixedAmountDifference) || 0) + parseFloat(merchantSettlement.baseRateFixedAmount)
      },
      computeTotalServiceFeeRate(merchantSettlement) {
        const total = (parseFloat(merchantSettlement.serviceFeeRate) || 0) + parseFloat(merchantSettlement.baseServiceRate)
        return total.toFixed(2)
      },
      computeTotalServiceFee(merchantSettlement) {
        const total = (parseFloat(merchantSettlement.serviceFee) || 0) + parseFloat(merchantSettlement.baseServiceFee)
        return total.toFixed(2)
      },
      onClickAgentCount(row) {
        this.merchantListVisible = true
        this.childMerchantList = row.childList
      },
      closeAddResult() {
        this.getList()
        this.addResultDialogFormVisible = false
      }
    }
  }
</script>

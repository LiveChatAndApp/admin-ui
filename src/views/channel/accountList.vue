<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.merchantId" :options="merchantList" v-if="isSuperAdmin()" filterable
          :placeholder="$t('merchantList.merchant')" v-permission="[Permission.IndexingMerchantall]" />
        <bs-select v-model="paging.query.vendorId" :options="vendorList" @change="onChangeQueryVenderId"
          :placeholder="$t('accountList.vendorName')" filterable />
        <bs-select v-model="paging.query.accountId" :options="accountListByVendor"
          :placeholder="$t('accountList.accountName')" filterable v-permission="[Permission.AccountList]" />
        <!-- <bs-select
          v-model="paging.query.channelCode"
          :options="channelList"
          @change="onChangeChannelCode"
          :placeholder="$t('channelList.channelName')"
        />-->
        <!-- <bs-select
          v-model="paging.query.accountCode"
          :options="accountCodeList"
          :placeholder="$t('channelList.channelName')"
        />-->
        <bs-select v-model="paging.query.statusList" :options="AccountStatusOptions" :placeholder="$t('status.status')"
          :multiple="true" v-if="isSuperAdmin()" />
        <!-- 追蹤狀態 -->
        <bs-select v-model="paging.query.traceStatus" :options="StatusOptions"
          :placeholder="$t('accountList.traceStatus')" v-if="isSuperAdmin()" />

        <!-- 連線狀態 -->
        <bs-select v-model="paging.query.connStatus" :options="ConnectStatusOptions"
          :placeholder="$t('accountList.connectStatus')" v-if="isSuperAdmin()" />
        <!-- <bs-account-select
          v-model="paging.query.accountId"
          :placeholder="$t('accountList.accountName')"
        />-->

        <bs-search-button @click="handleSearch" v-permission="[Permission.AccountList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.AccountAdd]" />

        <!-- 批次上傳 -->
        <!-- <bs-button
          @click="dialogAddInBatchVisible=true"
          :title="$t('accountList.addInBatch')"
          v-permission="[Permission.AccountAdd]"
        />-->
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%;" v-permission="[Permission.AccountList]">
        <el-table-column :label="$t('table.id')">
          <template slot-scope="scope">{{ scope.row.accountId }}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantList.merchant')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <bs-merchant-link :merchant-id="scope.row.merchantId">{{ scope.row.merchantId }}</bs-merchant-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('accountList.vendorName')">
          <template slot-scope="scope">{{ scope.row.vendorName }}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.accountName')">
          <template slot-scope="scope">{{ scope.row.accountName }}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.thirdMerchantId')">
          <template slot-scope="scope">{{ scope.row.thirdMerchantId }}</template>
        </el-table-column>
        <!-- <el-table-column :label="$t('accountList.thirdMerchantSign')">
          <template slot-scope="scope">{{ scope.row.thirdMerchantSign }}</template>
        </el-table-column>-->

        <!-- <el-table-column :label="$t('accountList.catchId')">
          <template slot-scope="scope">{{scope.row.catchId}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.balance')">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('agentList.freezeAmount')">
          <template slot-scope="scope">{{scope.row.frozenAmount | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.enableStatusTime')">
          <template slot-scope="scope">{{scope.row.enableStatusTime | moment}}</template>
        </el-table-column>
        <el-table-column :label="$t('accountList.securityQuestion')">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.securityQuestionList" :key="(item, index)">
              <div v-if="item.question || item.answer" style="margin: 3px 0">
                {{`${$t('accountList.question')}${index+1}: ${item.question}`}}
                <br />
                {{`${$t('accountList.answer')}${index+1}: ${item.answer}`}}
              </div>
            </span>
          </template>
        </el-table-column>-->

        <!-- 订单发起URL -->
        <!-- <el-table-column :label="$t('accountList.orderOriginationUrl')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.orderOriginationUrl" :size="30" />
          </template>
        </el-table-column>-->
        <!-- 订单查询URL -->
        <!-- <el-table-column :label="$t('accountList.orderQueryUrl')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.orderQueryUrl" :size="30" />
          </template>
        </el-table-column>-->
        <!-- 余额查询URL -->
        <!-- <el-table-column :label="$t('accountList.balanceQueryUrl')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.balanceQueryUrl" :size="30" />
          </template>
        </el-table-column>-->

        <!-- 更新时间 -->
        <el-table-column :label="$t('timestamp.updateTime')">
          <template slot-scope="scope">{{ scope.row.updateTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-account-status :status="scope.row.status" :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)"
              :clickable="hasAcl(Permission.AccountUpdate) && hasAcl(Permission.AccountStatusUpdate)" />
          </template>
        </el-table-column>

        <!-- 追蹤狀態 -->
        <el-table-column :label="$t('accountList.traceStatus')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <bs-status :title="$t('dialog.update') + $t('accountList.traceStatus')"
              @on-click-submit="changeTraceStatus(scope.row, $event)" :status="scope.row.traceStatus"
              :clickable="hasAcl(Permission.AccountUpdate) && hasAcl(Permission.AccountTraceStatusUpdate)" />
          </template>
        </el-table-column>

        <!-- 連線狀態 -->
        <el-table-column :label="$t('accountList.connectStatus')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <el-tag class="text" :type="getConnectStatusText(scope.row.connStatus).color">{{
            getConnectStatusText(scope.row.connStatus).name }}</el-tag>
          </template>
        </el-table-column>

        <!-- 刷新时间 -->
        <el-table-column :label="$t('table.refreshTime')" v-if="isSuperAdmin()">
          <template slot-scope="scope">{{ scope.row.connRefreshTime | moment }}</template>
        </el-table-column>

        <el-table-column :label="$t('table.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')">
          <template slot-scope="scope">
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.AccountUpdate]" />
            <!-- 連線刷新 -->
            <bs-button v-if="isSuperAdmin()" :title="$t('table.refreshConnect')"
              @click="handleConnectRefresh(scope.row)" v-permission="[Permission.AccountCheckConnection]"
              class="remove-m-l" />
            <!-- 先 disable -->
            <!-- <bs-button
              :title="$t('accountList.testAccountForPc')"
              @click="handleTestAccountPc(scope.row)"
              v-permission="[Permission.AccountTest]"
              class="remove-m-l"
            />
            <bs-button
              :title="$t('accountList.testAccountForWap')"
              @click="handleTestAccountWap(scope.row)"
              v-permission="[Permission.AccountTest]"
              class="remove-m-l"
            />
            <bs-button
              :title="$t('accountList.reportData')"
              @click="handleReport(scope.row)"
              v-permission="[Permission.AccountTest]"
              class="remove-m-l"
            />-->
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="95%">
        <el-form v-if="formData.channelCode === ChannelCode.BankGate" :rules="rules" ref="dataForm" :model="formData"
          label-position="left" label-width="130px">
          <el-form-item :label="$t('accountList.channel')" prop="channelCode">
            <!-- <bs-select
              v-model="formData.channelCode"
              :options="channelList"
              @change="onChangeChannel"
              :disabled="dialogType === DialogType.Update"
              :placeholder="$t('channelList.channelName')"

            />-->
          </el-form-item>
          <el-form-item :label="$t('accountList.accountCode')" prop="accountCode">
            <bs-select v-model="formData.accountCode" :options="accountCodeOptions"
              :disabled="dialogType === DialogType.Update" :placeholder="$t('channelList.channelName')" />
          </el-form-item>
          <el-form-item :label="$t('accountList.catchId')" prop="catchId">
            <bs-input v-model="formData.catchId" />
          </el-form-item>
          <el-form-item :label="$t('accountList.catchPassword')" v-if="dialogType === DialogType.Update">{{
          formData.catchPassword }}</el-form-item>
          <el-form-item :label="$t('accountList.accountName')" prop="accountName">
            <bs-input v-model="formData.accountName" />
          </el-form-item>
          <el-form-item :label="$t('accountList.loginUsername')" prop="loginUsername">
            <bs-input v-model="formData.loginUsername" />
          </el-form-item>
          <el-form-item :label="$t('accountList.loginPassword')" prop="loginPassword">
            <bs-input v-model="formData.loginPassword" />
          </el-form-item>
          <el-form-item :label="$t('accountList.mobile')" prop="mobile">
            <bs-input v-model="formData.mobile" />
          </el-form-item>
          <el-form-item :label="$t('accountList.bootServer')" prop="bootServer">
            <bs-input v-model="formData.bootServer" />
          </el-form-item>
          <el-form-item :label="$t('accountList.cost')" prop="cost">
            <bs-input v-model="formData.costRate" />% +
            <bs-input v-model="formData.costFixedAmount" />
          </el-form-item>
          <el-form-item :label="$t('accountList.minPayAmount')" prop="minAmount">
            <bs-input v-model="formData.minAmount" />
          </el-form-item>
          <el-form-item :label="$t('accountList.maxPayAmount')" prop="maxAmount">
            <bs-input v-model="formData.maxAmount" />
          </el-form-item>
          <el-form-item :label="$t('accountList.dayMaxPayAmount')" prop="dayMaxAmount">
            <bs-input v-model="formData.dayMaxAmount" />
          </el-form-item>
          <el-form-item :label="$t('accountList.dayMaxPayCount')" prop="dayMaxCount">
            <bs-input v-model="formData.dayMaxCount" />
          </el-form-item>
          <el-form-item :label="$t('accountList.gateway')" prop="gateway">
            <bs-input v-model="formData.gateway" />
          </el-form-item>
          <el-form-item :label="$t('accountList.pcType')">
            <bs-select v-model="formData.pcType" :options="pcTypeOptions" />
          </el-form-item>
          <el-form-item :label="$t('accountList.wapType')">
            <bs-select v-model="formData.wapType" :options="wapTypeOptions" />
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="AccountStatusOptions" />
          </el-form-item>
          <el-form-item :label="$t('table.memo')" :prop="dialogType === DialogType.Update ? 'memo' : undefined">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <!-- 新的 dialog -->
        <el-form v-else :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="130px">
          <!-- 金流商 -->
          <el-form-item :label="$t('accountList.vendorName')" prop="vendorId">
            <bs-select v-model="formData.vendorId" :options="vendorList" @change="onChangeVendorId"
              :disabled="dialogType === DialogType.Update" :placeholder="$t('status.allStatus')" :clearable="false"
              filterable />
          </el-form-item>
          <!-- 有選擇金流商才會顯示 -->
          <template v-if="formData.vendorId">
            <!-- 帳號名稱 -->
            <el-form-item :label="$t('accountList.accountName')" prop="accountName">
              <bs-input v-model="formData.accountName" />
            </el-form-item>

            <!-- 金流方商戶名称 -->
            <!-- <el-form-item :label="$t('accountList.thirdMerchantName')" prop="thirdMerchantName">
              <bs-input v-model="formData.thirdMerchantName" />
            </el-form-item>-->

            <!-- 金流方商戶ID -->
            <el-form-item :label="$t('accountList.thirdMerchantId')" prop="thirdMerchantId">
              <bs-input v-model="formData.thirdMerchantId" />
            </el-form-item>
            <!-- 金流方验证密钥 -->
            <el-form-item :label="$t('accountList.thirdMerchantSign')" prop="thirdMerchantSign">
              <el-input style="width: auto;" :type="thirdMerchantSignType" v-model="formData.thirdMerchantSign"
                :placeholder="$t('accountList.thirdMerchantSign')" :disabled="thirdMerchantSignDisable" />
              <span class="show-pwd" @click="changePasswordType('thirdMerchantSignType')">
                <svg-icon icon-class="eye" />
              </span>
              <bs-button :title="$t('button.copy')" v-clipboard:copy="formData.thirdMerchantSign" />
              <bs-button :title="$t('button.resetting')" @click="resetKey('thirdMerchantSign')" />
            </el-form-item>

            <!-- 订单发起URL -->
            <el-form-item :label="$t('accountList.orderOriginationUrl')" prop="orderOriginationUrl">
              <bs-input v-model="formData.orderOriginationUrl" :placeholder="$t('accountList.defaultThirdUrl')"
                class="urlInput" />
            </el-form-item>
            <!-- 订单查询URL -->
            <el-form-item :label="$t('withdrawChannelList.orderQueryUrl')" prop="orderQueryUrl">
              <bs-input v-model="formData.orderQueryUrl" :placeholder="$t('accountList.defaultThirdUrl')"
                class="urlInput" />
            </el-form-item>
            <!-- 余额查询URL -->
            <!-- <el-form-item :label="$t('withdrawChannelList.balanceQueryUrl')" prop="balanceQueryUrl">
              <bs-input
                v-model="formData.balanceQueryUrl"
                :placeholder="$t('accountList.defaultThirdUrl')"
                class="urlInput"
              />
            </el-form-item> -->

            <!-- 金流方公钥 -->
            <el-form-item :label="$t('accountList.thirdPublicKey')" prop="publicKey">
              <el-input style="width: auto;" :type="publicKeyType" v-model="formData.publicKey"
                :placeholder="$t('accountList.thirdPublicKey')" :disabled="publicKeyDisable" />
              <span class="show-pwd" @click="changePasswordType('publicKeyType')">
                <svg-icon icon-class="eye" />
              </span>
              <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.publicKey" />
              <bs-button :title="$t('withdrawChannelList.resetting')" @click="resetKey('publicKey')" />
            </el-form-item>

            <!-- 金流方私钥 -->
            <el-form-item :label="$t('accountList.thirdPrivateKey')" prop="privateKey">
              <el-input style="width: auto;" :type="privateKeyType" v-model="formData.privateKey"
                :placeholder="$t('accountList.thirdPrivateKey')" :disabled="privateKeyDisable" />
              <span class="show-pwd" @click="changePasswordType('privateKeyType')">
                <svg-icon icon-class="eye" />
              </span>
              <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.privateKey" />
              <bs-button :title="$t('withdrawChannelList.resetting')" @click="resetKey('privateKey')" />
            </el-form-item>

            <!-- 状态 -->
            <el-form-item :label="$t('status.status')" prop="status">
              <bs-select v-model="formData.status" :options="AccountStatusOptions" :clearable="false" />
            </el-form-item>

            <!-- 追蹤狀態 -->
            <el-form-item :label="$t('accountList.traceStatus')" prop="traceStatus" v-if="isSuperAdmin()">
              <bs-select v-model="formData.traceStatus" :options="StatusOptions" :clearable="false" />
            </el-form-item>

            <!-- 参数 -->
            <!-- <el-form-item :label="$t('accountList.param')" prop="param">
              <bs-text-area v-model="formData.param" />
            </el-form-item>-->

            <!-- 备注 -->
            <el-form-item :label="$t('table.memo')" prop="memo">
              <bs-text-area v-model="formData.memo" />
            </el-form-item>

            <!-- 添加 -->
            <bs-add-button @click="handleAddChannel" v-permission="[Permission.AccountAdd]" />

            <el-table :data="formData.accountChannelList.filter(o => o.action !== ActionType.DELETE)"
              v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit highlight-current-row
              style="width: 100%;" v-permission="[Permission.AccountList]">
              <!-- 渠道 -->
              <el-table-column :label="$t('accountList.channel')">
                <template slot-scope="scope">
                  <bs-select v-model="scope.row.channelId" :options="vendorChannelList"
                    :placeholder="$t('accountList.channel')" :clearable="false" :disabled="scope.row.action !== 'add'"
                    @change="handleChangeChannelId(vendorChannelList, scope.row)" />
                </template>
              </el-table-column>

              <!-- 三方渠道編號 -->
              <el-table-column :label="$t('accountList.thirdChannelCode')">
                <template slot-scope="scope">
                  <bs-input v-model="scope.row.thirdChannelCode" :placeholder="$t('accountList.thirdChannelCode')" />
                  <h5 style="margin: 0">{{$t('tips.default')}}: {{ scope.row.oriThirdChannelCode }}</h5>
                </template>
              </el-table-column>

              <!-- 單筆限額 -->
              <el-table-column :label="$t('accountList.payAmount')">
                <template slot-scope="scope">
                  <bs-input v-model="scope.row.singleMinAmount" @blur="inputMoney($event, scope.row, 'singleMinAmount')"
                    :placeholder="$t('placeholder.singleMinAmount')" />~
                  <bs-input v-model="scope.row.singleMaxAmount" @blur="inputMoney($event, scope.row, 'singleMaxAmount')"
                    :placeholder="$t('placeholder.singleMaxAmount')" />
                </template>
              </el-table-column>

              <!-- 单笔固定限额，不是必填-->
              <el-table-column :label="$t('accountList.singleFixedAmount')" width="200px">
                <template slot-scope="scope">
                  <div class="filter-container">
                    <bs-input v-model="scope.row.singleFixedAmountList[0].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 0)"
                      :placeholder="$t('placeholder.amount') + 1"
                      :disabled="scope.row.singleFixedAmountList[0].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[1].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 1)"
                      :placeholder="$t('placeholder.amount') + 2"
                      :disabled="scope.row.singleFixedAmountList[1].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[2].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 2)"
                      :placeholder="$t('placeholder.amount') + 3"
                      :disabled="scope.row.singleFixedAmountList[2].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[3].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 3)"
                      :placeholder="$t('placeholder.amount') + 4"
                      :disabled="scope.row.singleFixedAmountList[3].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[4].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 4)"
                      :placeholder="$t('placeholder.amount') + 5"
                      :disabled="scope.row.singleFixedAmountList[4].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[5].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 5)"
                      :placeholder="$t('placeholder.amount') + 6"
                      :disabled="scope.row.singleFixedAmountList[5].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[6].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 6)"
                      :placeholder="$t('placeholder.amount') + 7"
                      :disabled="scope.row.singleFixedAmountList[6].disable" />
                    <bs-input v-model="scope.row.singleFixedAmountList[7].value"
                      @blur="inputMoney($event, scope.row, 'singleFixedAmount', 7)"
                      :placeholder="$t('placeholder.amount') + 8"
                      :disabled="scope.row.singleFixedAmountList[7].disable" />
                  </div>
                </template>
              </el-table-column>

              <!-- 單日限額 -->
              <el-table-column :label="$t('accountList.dayMaxAmount')">
                <template slot-scope="scope">
                  <bs-input v-model="scope.row.singleDayAmount"
                    @blur="inputMoney($event, scope.row, 'singleDayAmount')" />
                </template>
              </el-table-column>

              <!-- 單日限筆 -->
              <el-table-column :label="$t('accountList.dayMaxCount')">
                <template slot-scope="scope">
                  <bs-input v-model="scope.row.singleDayCount"
                    @blur="inputMoney($event, scope.row, 'singleDayCount')" />
                </template>
              </el-table-column>

              <!-- 狀態 -->
              <el-table-column :label="$t('status.status')">
                <template slot-scope="scope">
                  <bs-select v-model="scope.row.status" placeholder="1" :options="StatusOptions" :clearable="false" />
                </template>
              </el-table-column>

              <!-- 操作 -->
              <el-table-column :label="$t('table.actions')" width="78px">
                <template slot-scope="scope">
                  <!-- <bs-edit-button
                    @click="handleModify(scope.row)"
                    v-permission="[Permission.AccountUpdate]"
                  />
                  <bs-button
                    :title="$t('accountList.testAccountForPc')"
                    @click="handleTestAccountPc(scope.row)"
                    v-permission="[Permission.AccountTest]"
                  />
                  <bs-button
                    :title="$t('accountList.testAccountForWap')"
                    @click="handleTestAccountWap(scope.row)"
                    v-permission="[Permission.AccountTest]"
                  />
                  <bs-button
                    :title="$t('accountList.reportData')"
                    @click="handleReport(scope.row)"
                    v-permission="[Permission.AccountTest]"
                  />-->
                  <el-button @click="handleDeleteChannel(scope.row, scope.$index)"
                    v-if="scope.row.action !== ActionType.UPDATE" type="danger" size="small">{{ $t('table.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-form>

        <!-- 原始程式碼 -->
        <!-- <el-form v-else :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="130px">
          <el-form-item :label="$t('accountList.channel')" prop="channelCode">
            <bs-select v-model="formData.channelCode" :options="channelList" @change="onChangeChannel"
                       :disabled="dialogType===DialogType.Update"
                       :placeholder="$t('channelList.channelName')"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.accountCode')" prop="accountCode">
            <bs-select v-model="formData.accountCode" :options="accountCodeOptions"
                       :disabled="dialogType===DialogType.Update"
                       :placeholder="$t('channelList.channelName')"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.catchId')" prop="catchId">
            <bs-input v-model="formData.catchId"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.catchPassword')" v-if="dialogType===DialogType.Update">
            {{formData.catchPassword}}
          </el-form-item>
          <el-form-item :label="$t('catchMode.title')" prop="catchMode">
            <bs-select v-model="formData.catchMode" :options="CatchModeOptions"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.accountName')" prop="accountName">
            <bs-input v-model="formData.accountName"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.aliUid')" prop="aliUid">
            <bs-input v-model="formData.aliUid"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.appId')" prop="appId">
            <bs-input v-model="formData.appId"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.publicKey')" prop="publicKey">
            <bs-text-area :placeholder="$t('accountList.publicKey')" v-model="formData.publicKey"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.privateKey')" prop="privateKey">
            <bs-text-area :placeholder="$t('accountList.privateKey')" v-model="formData.privateKey"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.loginUsername')" prop="loginUsername">
            <bs-input v-model="formData.loginUsername"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.loginPassword')" prop="loginPassword">
            <bs-input v-model="formData.loginPassword"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.transactionPassword')" prop="transactionPassword">
            <bs-input v-model="formData.transactionPassword"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.securityQuestion')">
            {{$t('accountList.question')}}:
            <bs-input v-model="formData.securityQuestionList[0].question"/>
            {{$t('accountList.answer')}}:
            <bs-input v-model="formData.securityQuestionList[0].answer"/>
            <br/>
            {{$t('accountList.question')}}:
            <bs-input v-model="formData.securityQuestionList[1].question"/>
            {{$t('accountList.answer')}}:
            <bs-input v-model="formData.securityQuestionList[1].answer"/>
            <br/>
            {{$t('accountList.question')}}:
            <bs-input v-model="formData.securityQuestionList[2].question"/>
            {{$t('accountList.answer')}}:
            <bs-input v-model="formData.securityQuestionList[2].answer"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.mobile')" prop="mobile">
            <bs-input v-model="formData.mobile"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.bankCard')" prop="bankCardId">
            <bs-select v-model="formData.bankCardId" :options="bankCardList"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.bootServer')">
            <bs-input v-model="formData.bootServer"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.cost')" prop="cost">
            <bs-input v-model="formData.costRate"/>
            % +
            <bs-input v-model="formData.costFixedAmount"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.minPayAmount')" prop="minAmount">
            <bs-input v-model="formData.minAmount"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.maxPayAmount')" prop="maxAmount">
            <bs-input v-model="formData.maxAmount"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.dayMaxPayAmount')" prop="dayMaxAmount">
            <bs-input v-model="formData.dayMaxAmount"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.dayMaxPayCount')" prop="dayMaxCount">
            <bs-input v-model="formData.dayMaxCount"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.specifiedAmounts')">
            <el-select v-model="formData.specifiedAmountList" multiple filterable allow-create default-first-option/>
          </el-form-item>
          <el-form-item :label="$t('accountList.catalog')" prop="catalogId">
            <bs-catalog-select v-model="formData.catalogId"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.gateway')" prop="gateway">
            <bs-input v-model="formData.gateway"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.isGateUsed')" prop="isGateUsed">
            <bs-switch v-model="formData.isGateUsed"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.pcType')">
            <bs-select v-model="formData.pcType" :options="pcTypeOptions"/>
          </el-form-item>
          <el-form-item :label="$t('accountList.wapType')">
            <bs-select v-model="formData.wapType" :options="wapTypeOptions"/>
          </el-form-item>
          <el-form-item :label="$t('status.status')" prop="status">
            <bs-select v-model="formData.status" :options="AccountStatusOptions"/>
          </el-form-item>
          <el-form-item :label="$t('settlement.name')" prop="settlement">
            <bs-select v-model="formData.settlement" :options="AccountSettlementOptions"/>
          </el-form-item>
          <el-form-item :label="$t('settlement.belong')" prop="belong">
            <bs-select :filterable="true" :clearable="true" v-model="formData.belong" :options="merchantList"/>
          </el-form-item>
          <el-form-item :label="$t('table.memo')" :prop="dialogType===DialogType.Update?'memo':undefined">
            <bs-text-area v-model="formData.memo"/>
          </el-form-item>
        </el-form>-->

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible = false" />
          <bs-submit-button v-if="dialogType === DialogType.Create" @click="createData" />
          <bs-submit-button v-else @click="updateData" />
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogReportVisible" v-if="dialogReportVisible" :close-on-click-modal="false"
        :show-close="true">
        <el-date-picker v-model="paging.query.dates" :clearable="false" value-format="yyyy-MM-dd" />
        <div slot="footer" class="dialog-footer">
          <bs-submit-button @click="reportData" />
        </div>
      </el-dialog>

      <el-dialog :title="$t('accountList.addInBatch')" :visible.sync="dialogAddInBatchVisible"
        v-if="dialogAddInBatchVisible" :close-on-click-modal="false" width="400px" :show-close="true">
        <bs-button :title="$t('accountList.downloadAddInBatchTemplate')" @click="handleDownload" />
        <el-upload class="upload-demo" drag :headers="uploadHeaders" :action="uploadUrl" :on-success="onUploadSuccess"
          :on-error="onUploadError" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            {{ $t('table.multipleAdd1') }}
            <em>{{ $t('table.multipleAdd2') }}</em>
          </div>
          <div class="el-upload__tip" slot="tip">{{ $t('table.multipleAddTip') }}</div>
        </el-upload>
      </el-dialog>

      <el-dialog :title="QRcode" :visible.sync="qrCodeDialogVisible" v-if="qrCodeDialogVisible"
        :close-on-click-modal="false" width="400px" :show-close="true">
        <span>{{ $t('accountList.testAccountTitle') + wapOrder.orderId }}</span>
        <img :src="'http://chart.apis.google.com/chart?cht=qr&choe=UTF-8&chs=300x300&chl=' + wapOrder.qrCodeUrl" />
        <bs-submit-button @click="qrCodeDialogVisible = false" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  ActionType,
  AccountChannelTypeGroup,
  AccountCodeList,
  // AccountStatus,
  BankCardType,
  CatchMode,
  ChannelCode,
  ChannelCodeWithoutAccount,
  DialogType,
  Permission,
  Status
} from '@/definitions/constants'
import {
  AccountChannelTypeOptions,
  AccountSettlementOptions,
  AccountStatusOptions,
  CatchModeOptions,
  DialogTypeOptions,
  StatusOptions,
  ConnectStatusOptions
} from '@/definitions/options'
import {
  // addAccount, 改用 addNewAccount
  addNewAccount,
  // getAccountList, 改用 getNewAccountList
  getNewAccountList,
  getAllAccountList,
  getAddAccountInBatchUrl,
  getAccountListByVendor,
  testAccount,
  // updateAccount,
  updateAccountStatus,
  updateNewAccount,
  accountReport,
  updateTraceStatus,
  getCheckConnection
} from '@/api/account'
import moment from 'moment'
import { getMerchantIndexingAll } from '@/api/indexing'
import { deepClone, objectMerge } from '@/utils'
import { isSuperAdminLevel } from '@/utils/user'
import { delcommafy, moneyToCent, moneyToDollar, getInputValue } from '@/utils/money'
import { Rules, Regex, headTailSpaceMsgType } from '@/definitions/fieldCheck'
import { getHeaders } from '@/utils/request'
import { showFailure, showSuccess } from '@/utils/executionMessage'
import { Message } from 'element-ui'
import { getBankCardIndexing, getChannelIndexing, getVendorList, getVendorChannelList } from '@/api/indexing'
import { hasAcl } from '@/utils/auth'
import clipboard from '@/directive/clipboard'
import { str } from '@/utils/string'

export default {
  name: 'accountList',
  directives: {
    clipboard
  },
  data() {
    return {
      ActionType,
      Permission,
      moment,
      dialogFormVisible: false,
      DialogType,
      dialogType: 0,
      merchantList: [],
      DialogTypeOptions,
      dialogAddInBatchVisible: false,
      dialogReportVisible: false,
      qrCodeDialogVisible: false,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          dates: '',
          page: 0,
          rows: undefined,
          statusList: [],
          traceStatus: undefined, // 追蹤狀態
          connStatus: undefined // 連線狀態
        }
      },
      rules: {
        thirdChannelCode: [...Rules.requiredBlur, ...Rules.headTailSpace],
        orderOriginationUrl: [...Rules.url],
        orderQueryUrl: [...Rules.url],
        balanceQueryUrl: [...Rules.url],
        status: [...Rules.requiredBlur],
        traceStatus: [...Rules.requiredBlur],
        memo: [...Rules.memo],
        param: [...Rules.json],
        vendorId: [...Rules.requiredBlur],
        thirdMerchantName: [...Rules.requiredBlur, ...Rules.name, ...Rules.noSpace],

        thirdMerchantId: [...Rules.requiredBlur, ...Rules.noSpace, ...Rules.noChinese],
        publicKey: [...Rules.noSpace],
        privateKey: [...Rules.noSpace],
        thirdMerchantSign: [...Rules.thirdKey, ...Rules.noSpace, ...Rules.noChinese],

        channelCode: [...Rules.requiredChange],
        accountCode: [...Rules.requiredChange],
        catchId: [...Rules.requiredBlur, ...Rules.noSpecialCharacters],
        catchMode: [...Rules.requiredChange],
        accountName: [...Rules.requiredBlur, ...Rules.name],
        aliUid: [...Rules.requiredBlur, ...Rules.noSpecialCharacters],
        appId: [...Rules.requiredBlur, ...Rules.noSpecialCharacters],
        loginUsername: [...Rules.requiredBlur],
        loginPassword: [...Rules.requiredBlur],
        transactionPassword: [...Rules.requiredBlur],
        mobile: [...Rules.requiredBlur, ...Rules.mobile],
        cost: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!this.formData.costRate && !this.formData.costFixedAmount) {
                callback(this.$t('rules.required'))
              } else if (this.formData.costRate && isNaN(parseInt(this.formData.costRate))) {
                callback(this.$t('rules.rate'))
              } else if (this.formData.costFixedAmount && isNaN(parseInt(this.formData.costFixedAmount))) {
                callback(this.$t('rules.rate'))
              } else {
                callback()
              }
            }
          }
        ],
        minAmount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const minAmountNumber = parseInt(value)
              const maxAmountNumber = parseInt(this.formData.maxAmount)
              const dayMaxAmountNumber = parseInt(this.formData.dayMaxAmount)
              if (minAmountNumber > maxAmountNumber || minAmountNumber > dayMaxAmountNumber) {
                callback(this.$t('rules.minPayAmount'))
              } else {
                callback()
              }
            }
          },
          ...Rules.payAmount
        ],
        maxAmount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const minAmountNumber = parseInt(this.formData.minAmount)
              const maxAmountNumber = parseInt(value)
              const dayMaxAmountNumber = parseInt(this.formData.dayMaxAmount)
              if (maxAmountNumber < minAmountNumber || maxAmountNumber > dayMaxAmountNumber) {
                callback(this.$t('rules.maxPayAmount'))
              } else {
                callback()
              }
            }
          },
          ...Rules.payAmount
        ],
        dayMaxAmount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const minAmountNumber = parseInt(this.formData.minAmount)
              const maxAmountNumber = parseInt(this.formData.maxAmount)
              const dayMaxAmountNumber = parseInt(value)
              if (dayMaxAmountNumber < maxAmountNumber || dayMaxAmountNumber < minAmountNumber) {
                callback(this.$t('rules.dayMaxPayAmount'))
              } else {
                callback()
              }
            }
          },
          ...Rules.payAmount
        ],
        dayMaxCount: [...Rules.requiredBlur, ...Rules.payCount],
        catalogId: [...Rules.requiredChange],
        gateway: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('rules.required')
          },
          ...Rules.url
        ],
        isGateUsed: [{ required: true, trigger: 'change' }]
      },
      ChannelCode,
      AccountStatusOptions,
      StatusOptions,
      CatchModeOptions,
      AccountChannelTypeOptions,
      AccountSettlementOptions,
      ConnectStatusOptions,
      defaultFormData: {
        catchMode: CatchMode.WebBrowser,
        costRate: 0.6,
        costFixedAmount: 0,
        minAmount: 1,
        maxAmount: 50000,
        dayMaxAmount: 1000000,
        dayMaxCount: 1000,
        status: Status.Enabled,
        traceStatus: Status.Enabled,
        isGateUsed: Status.Enabled,
        catalogId: undefined,
        securityQuestionList: [{}, {}, {}],
        accountChannelList: []
      },
      defaultSingleFixedAmountList: [
        { value: '', disable: false },
        { value: '', disable: true },
        { value: '', disable: true },
        { value: '', disable: true },
        { value: '', disable: true },
        { value: '', disable: true },
        { value: '', disable: true },
        { value: '', disable: true }
      ],
      formData: {},
      list: [],
      channelList: [],
      accountCodeList: [],
      bankCardList: [],
      accountCodeOptions: [],
      pcTypeOptions: AccountChannelTypeOptions.filter(o => o.group === AccountChannelTypeGroup.Pc),
      wapTypeOptions: AccountChannelTypeOptions.filter(o => o.group === AccountChannelTypeGroup.Wap),
      uploadUrl: getAddAccountInBatchUrl(),
      wapOrder: {
        qrCodeUrl: undefined,
        orderId: undefined
      },
      vendorList: [],
      vendorChannelList: [],
      accountListByVendor: [],

      // 金流方公钥 input type
      publicKeyType: 'password',
      // 金流方公钥 input disable
      publicKeyDisable: false,

      // 金流方私钥 input type
      privateKeyType: 'password',
      // 金流方私钥 input disable
      privateKeyDisable: false,

      // 金流方验证密钥 input type
      thirdMerchantSignType: 'password',
      // 金流方验证密钥 input disable
      thirdMerchantSignDisable: false
    }
  },
  created() {
    if (this.$route.query.accountId) {
      this.paging.query.channelCode = this.$route.query.channelCode
      this.paging.query.accountId = this.$route.query.accountId
    }
    this.queryVendorList()
    // this.queryChannelList().then(this.getList)
    this.getAccountOption()
    this.getList()
  },
  computed: {
    uploadHeaders() {
      return getHeaders(true)
    }
  },
  watch: {
    $route(to, from) {
      if (from.query.accountId !== to.query.accountId) {
        this.paging.query.channelCode = to.query.channelCode
        this.paging.query.accountId = to.query.accountId
        this.getList()
      }
    }
  },
  mounted() {
    if (this.isSuperAdmin()) {
      this.queryMerchantList()
    }
  },
  methods: {
    handleConnectRefresh({ accountId }) {
      const loading = this.$loading({
        lock: true,
        text: this.$t('table.processing'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'refreshLoading'
      })
      if (accountId) {
        // 连线刷新回傳後等3秒在關掉
        getCheckConnection({ accountId }).then(() => {
          setTimeout(() => {
            this.getList()
            loading.close()
          }, 3000)
        }).catch(() => {
          loading.close()
        })
      } else {
        loading.close()
      }
    },
    // filter 出相同 id
    getConnectStatusText(id) {
      return ConnectStatusOptions.find(o => o.id === id) || {}
    },
    // 更新追蹤狀態
    changeTraceStatus(row, { status, memo }) {
      const data = {
        accountId: row.accountId,
        traceStatus: status, // 因為共用 bs-status 元件，所以要取 status 的 key
        memo
      }
      updateTraceStatus(data).then(() => {
        this.getList()
      })
    },
    // 渠道下拉選單切換
    handleChangeChannelId(options, row) {
      const { thirdChannelCode = null } = options.find(o => o.id === row.channelId) || {}
      // 有濾出來再去做更新
      if (thirdChannelCode) {
        // 切換渠道帶入三方渠道編號
        row.thirdChannelCode = thirdChannelCode
        row.oriThirdChannelCode = thirdChannelCode
      }
    },
    // 重置密碼
    resetKey(type) {
      this[`${type}Type`] = ''
      this.formData[type] = ''
      this[`${type}Disable`] = false
      this[`${type}Type`] = 'password'
    },
    checkKey() {
      // 判斷公、私、密鑰
      const { publicKey, privateKey, thirdMerchantSign } = this.formData
      // 不能全空
      if (!publicKey && !privateKey && !thirdMerchantSign) {
        return this.showErrorMessage(this.$t('accountList.keyErr.allEmpty'))
      }
      return true
    },
    // 切換公鑰私鑰顯示型態
    changePasswordType(type) {
      if (this[type] === 'password') {
        this[type] = ''
      } else {
        this[type] = 'password'
      }
    },
    inputMoney(el, row, name, index) {
      if (name === 'singleFixedAmount') {
        const indexLength = 7
        const { singleFixedAmountList } = row
        const value = getInputValue(el.target.value, name === 'singleDayCount' ? 0 : 2)

        // 取得 format 的 value
        const formatValue = delcommafy(value)

        if (parseFloat(formatValue) !== 0 && index < 7 && Regex.floating.test(formatValue)) {
          // step1. 更新原有值
          singleFixedAmountList[index].value = value
          // step3: 如果是數值後面就開放一格
          singleFixedAmountList[index + 1].disable = false
        } else {
          // step2: 如果目前的值不是數值單位後面之後就都不開放
          for (let i = index + 1; i < indexLength + 1; i++) {
            singleFixedAmountList[i].disable = true
            singleFixedAmountList[i].value = ''
          }
        }
      } else {
        // singleDayCount 是要整數
        row[name] = getInputValue(el.target.value, name === 'singleDayCount' ? 0 : 2)
      }
    },
    // 添加 row
    handleAddChannel() {
      const option = {
        singleMinAmount: '',
        singleMaxAmount: '',
        singleDayAmount: '',
        singleDayCount: '',
        // 单笔固定限额 放在 array 內
        singleFixedAmountList: [
          { value: '', disable: false },
          { value: '', disable: true },
          { value: '', disable: true },
          { value: '', disable: true },
          { value: '', disable: true },
          { value: '', disable: true },
          { value: '', disable: true },
          { value: '', disable: true }
        ],
        action: 'add',
        channelId: '',
        id: new Date() / 1,
        index: this.formData.accountChannelList.length || 0, // 建立 index 好判斷是在第幾個
        status: 1
      }
      this.formData.accountChannelList.push(option)
    },
    // 刪除 row
    handleDeleteChannel(row, index) {
      // 新增
      if (this.dialogType === DialogType.Create) {
        this.formData.accountChannelList.splice(index, 1)
      } else {
        // 編輯
        if (row.action === ActionType.ADD) {
          this.formData.accountChannelList.splice(index, 1)
        } else {
          // 編輯狀態
          // 將 status 改成 DELETE
          const data = {
            ...row,
            action: ActionType.DELETE
          }
          this.formData.accountChannelList.splice(row.index, 1, data)
        }
      }
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    // 驗證 row
    checkAccountChannelList() {
      // 至少需要一筆
      const { accountChannelList } = this.formData

      // 濾掉是 delete 狀態的欄位，不能為0筆
      const tempChannels = accountChannelList.filter(o => o.action !== ActionType.DELETE)

      if (accountChannelList.length < 1 || tempChannels.length < 1) {
        return this.showErrorMessage(this.$t('accountList.rules.accountChannelListEmpty'))
      }

      for (const channel of accountChannelList) {
        const { channelId, singleMinAmount, singleMaxAmount, singleDayAmount, singleDayCount, singleFixedAmountList, thirdChannelCode } = channel

        // 移除掉千分位
        const singleMinAmountStr = delcommafy(singleMinAmount)
        const singleMaxAmountStr = delcommafy(singleMaxAmount)
        const singleDayAmountStr = delcommafy(singleDayAmount)
        const singleDayCountStr = delcommafy(singleDayCount)

        const maxNumber = 100000000
        const minNumber = 1

        if (channelId === undefined || channelId === null || channelId === '') {
          return this.showErrorMessage(this.$t('accountList.rules.channelEmpty'))
        }

        // 第三方渠道編號不可以空白
        if (thirdChannelCode === undefined || thirdChannelCode === null || thirdChannelCode === '') {
          return this.showErrorMessage(this.$t('accountList.rules.thirdChannelCodeEmpty'))
        }

        // 判斷第三方渠道編號不可以前後空白
        const thirdChannelCodeMsg = headTailSpaceMsgType(thirdChannelCode)
        if (thirdChannelCodeMsg.length > 0) {
          if (thirdChannelCodeMsg === 'empty') {
            return this.showErrorMessage(this.$t('accountList.rules.thirdChannelCodeEmpty'))
          } else {
            return this.showErrorMessage(this.$t('accountList.rules.thirdChannelCodeSpace'))
          }
        }

        // 单笔限额
        if (!Regex.floating.test(singleMinAmountStr) || !Regex.floating.test(singleMaxAmountStr)) {
          // 輸入不是數字
          return this.showErrorMessage(this.$t('accountList.rules.minMaxAmountNotNumber'))
        }

        // 单笔限额-下限範圍
        if (parseFloat(singleMinAmountStr) < minNumber || parseFloat(singleMinAmountStr) > maxNumber) {
          return this.showErrorMessage(this.$t('rules.minAmountLength'))
        }
        // 单笔限额-上限範圍
        if (parseFloat(singleMaxAmountStr) < minNumber || parseFloat(singleMaxAmountStr) > maxNumber) {
          return this.showErrorMessage(this.$t('rules.maxAmountLength'))
        }
        // 单笔限额-下限大於上限
        if (parseFloat(singleMinAmountStr) > parseFloat(singleMaxAmountStr)) {
          return this.showErrorMessage(this.$t('accountList.rules.minGTRMaxAmount'))
        }

        // 檢查 "單筆固定限額" 落在輸入的單筆限額內
        const newSingleFixedAmountList = singleFixedAmountList.filter((o) => o.value !== '')

        // 判斷是否有重複值
        const valueList = newSingleFixedAmountList.reduce((item, o) => {
          if (o.value in item) {
            item[o.value]++
          } else {
            item[o.value] = 1
          }
          return item
        }, {})
        const hasSameValue = Object.values(valueList).filter(o => o > 1) || []

        // 代表輸入重複一樣的值
        if (hasSameValue.length > 0) {
          return this.showErrorMessage(this.$t('accountList.rules.singleFixedAmountNotDuplicate'))
        }

        // 判斷是否有值不在單筆限額範圍內
        for (const amoutObj of newSingleFixedAmountList) {
          // 如果不是數值
          const amountStr = delcommafy(amoutObj.value)
          if (!Regex.floating.test(amountStr)) {
            // 輸入不是數字
            return this.showErrorMessage(this.$t('accountList.rules.singleFixedAmountNotNumber'))
          }

          // 必須落在單筆限額上下限範圍內
          if (parseFloat(amountStr) > parseFloat(singleMaxAmountStr) || parseFloat(amountStr) < parseFloat(singleMinAmountStr)) {
            return this.showErrorMessage(this.$t('accountList.rules.singleFixedAmountNotBetween'))
          }
        }

        // 单日限额
        if (!Regex.floating.test(singleDayAmountStr)) {
          return this.showErrorMessage(this.$t('accountList.rules.dayMaxAmountNotNumber'))
        }

        // 单日限额 1~100000000
        if (parseFloat(singleDayAmountStr) < minNumber || parseFloat(singleDayAmountStr) > maxNumber) {
          return this.showErrorMessage(this.$t('rules.dayMaxAmountLength'))
        }

        // 单日限额不可以小于单笔最高限额
        if (parseFloat(singleDayAmountStr) < parseFloat(singleMaxAmountStr)) {
          return this.showErrorMessage(this.$t('accountList.rules.dayMaxLargerThanMax'))
        }

        // 单日限笔
        if (isNaN(parseInt(singleDayCountStr)) || !Regex.positiveInteger.test(singleDayCountStr)) {
          return this.showErrorMessage(this.$t('rules.dayMaxCountLength3'))
        }
        // 单日限笔 0~100000000
        if (parseInt(singleDayCountStr) < minNumber || parseInt(singleDayCountStr) > maxNumber) {
          return this.showErrorMessage(this.$t('rules.dayMaxCountLength3'))
        }
      }
      // 不可以重複設定 channel
      const channelIds = accountChannelList
        .filter(o => {
          return o.action !== ActionType.DELETE
        })
        .reduce((item, o) => {
          if (o.channelId in item) {
            item[o.channelId]++
          } else {
            item[o.channelId] = 1
          }
          return item
        }, {})
      const ids = Object.values(channelIds).filter(o => o > 1) || []
      // > 0 代表有重複
      if (ids.length > 0) {
        return this.showErrorMessage(this.$t('accountList.rules.duplicateChannel'))
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
    hasAcl,
    queryMerchantList() {
      getMerchantIndexingAll().then(response => {
        if (response) {
          this.merchantList = response.map(merchant => ({
            id: merchant.merchantId,
            name: merchant.merchantName
          }))
        }
      })
    },
    getAccountOption() {
      getAllAccountList().then(response => {
        if (response && response.length > 0) {
          this.accountListByVendor = response.map(({ accountId, accountName }) => {
            return {
              id: accountId,
              name: accountName
            }
          })
        }
      })
    },
    getList(shouldNotShowError) {
      // 目前先 disable 這段
      // if (!this.paging.query.channelCode) {
      //   if (shouldNotShowError) {
      //     Message({
      //       message: this.$t('accountList.errors.channelId'),
      //       type: 'error',
      //       duration: 5 * 1000
      //     })
      //     return
      //   }
      // }

      this.paging.isLoading = true
      const { vendorId, accountId, page, size, merchantId, statusList, connStatus, traceStatus } = this.paging.query
      const data = {
        vendorId,
        accountId,
        page,
        size,
        merchantId,
        traceStatus: traceStatus === 0 || traceStatus === 1 ? traceStatus : undefined, // 只有 0 、 1
        connStatus: connStatus && connStatus.length > 0 ? connStatus : undefined, // 字串
        statusList: statusList && statusList.length > 0 ? statusList.join(',') : undefined // 陣列
      }
      getNewAccountList(data).then(response => {
        this.list = response.content
        this.paging.totalElements = response.totalElements
        this.paging.isLoading = false
      })

      // getAccountList(this.paging.query).then(response => {
      //   if (response.content) {
      //     console.log('response.content:', response.content)
      //     response.content.forEach(res => {
      //       res.isGateUsed = res.isGateUsed ? 1 : 0
      //       res.balance = moneyToDollar(res.balance)
      //       res.frozenAmount = moneyToDollar(res.frozenAmount)
      //       res.minAmount = moneyToDollar(res.minAmount)
      //       res.maxAmount = moneyToDollar(res.maxAmount)
      //       res.dayMaxAmount = moneyToDollar(res.dayMaxAmount)
      //       res.costFixedAmount = moneyToDollar(res.costFixedAmount)
      //       if (res.specifiedAmountList) {
      //         res.specifiedAmountList = res.specifiedAmountList.map(amount => moneyToDollar(amount))
      //       }

      //       if (res.channelType) {
      //         const object = JSON.parse(res.channelType)

      //         const pcList = object[AccountChannelTypeGroup.Pc]
      //         if (pcList && pcList.length > 0) {
      //           res.pcType = pcList[0]
      //         }

      //         const wapList = object[AccountChannelTypeGroup.Wap]
      //         if (wapList && wapList.length > 0) {
      //           res.wapType = wapList[0]
      //         }
      //       }
      //     })
      //   }
      // this.list = response.content

      // this.paging.totalElements = response.totalElements
      // this.paging.isLoading = false
      // })
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
        accountId: row.accountId,
        status,
        action: 'STATUS',
        memo
      }
      if (hasAcl(Permission.AccountStatusUpdate)) {
        updateAccountStatus(data).then(() => {
          this.getList()
        })
      } else {
        updateNewAccount(data).then(() => {
          this.getList()
        })
      }
    },
    handleCreate() {
      this.queryMerchantList()
      // this.queryBankCardList()
      // this.queryChannelList()
      this.queryVendorList()
      this.formData = deepClone(this.defaultFormData)
      this.onChangeChannel(this.formData.channelCode)
      this.dialogFormVisible = true
      this.privateKeyType = 'password'
      this.publicKeyType = 'password'
      this.thirdMerchantSignType = 'password'
      this.privateKeyDisable = false
      this.publicKeyDisable = false
      this.thirdMerchantSignDisable = false
      this.dialogType = DialogType.Create
    },
    async handleModify(row) {
      this.queryMerchantList()
      // this.queryBankCardList()
      // this.queryChannelList()
      this.queryVendorList()
      // 先查出渠道 list 要用來查出 defualt 的 三方渠道編號
      await this.queryVendorChannelList(row.vendorId)

      // 將 publicKey 與 privateKey 改為 disable
      this.publicKeyDisable = true
      this.privateKeyDisable = true
      this.thirdMerchantSignDisable = true

      const newRow = {
        ...row,
        accountChannelList: row.accountChannelList.map((o, index) => {
          const { singleFixedAmount, channelId } = o
          // 單筆固定限額8個欄位初始值
          // 必須用 deepClone 不然會 reference 到
          const singleFixedAmountList = deepClone(this.defaultSingleFixedAmountList)
          // 當 singleFixedAmount 不是空字串
          if (!str.isEmpty(singleFixedAmount)) {
            const list = singleFixedAmount.split(',') || []
            // 更新有值的，會是依照 index 順序
            for (let i = 0; i < list.length; i++) {
              singleFixedAmountList[i].value = getInputValue(moneyToDollar(list[i]))
              singleFixedAmountList[i].disable = false
            }
            // 該資料下一筆開啟輸入狀態
            if (list.length < 8) {
              singleFixedAmountList[list.length].disable = false
            }
          }

          // 利用渠道選單從 channelId 濾出對應的三方渠道編號當成 default 值
          const { thirdChannelCode = '' } = this.vendorChannelList.find(a => a.id === channelId) || {}

          return {
            ...o,
            singleMinAmount: getInputValue(moneyToDollar(o.singleMinAmount)),
            singleMaxAmount: getInputValue(moneyToDollar(o.singleMaxAmount)),
            singleDayAmount: getInputValue(moneyToDollar(o.singleDayAmount)),
            singleDayCount: getInputValue(o.singleDayCount, 0),
            id: index,
            index,
            action: ActionType.UPDATE,
            singleFixedAmountList: [...singleFixedAmountList],
            oriThirdChannelCode: thirdChannelCode // default 三方渠道編號
          }
        })
      }

      this.formData = objectMerge(deepClone(this.defaultFormData), newRow)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
      this.privateKeyType = 'password'
      this.publicKeyType = 'password'
      this.thirdMerchantSignType = 'password'
      // 取得對應金流商的渠道
      // this.onChangeVendorId(this.formData.vendorId)
      this.onChangeChannel(this.formData.channelCode)
    },
    handleTestAccountPc(row) {
      testAccount({ accountId: row.accountId, channelType: 'PC' }).then(response => {
        window.open(response.payUrl, '_blank')
        this.$alert(
          this.$t('accountList.testAccountContent'),
          this.$t('accountList.testAccountTitle') + response.payOrderId
        )
      })
    },
    handleTestAccountWap(row) {
      testAccount({ accountId: row.accountId, channelType: 'WAP' }).then(response => {
        this.wapOrder.qrCodeUrl = response.payUrl
        this.wapOrder.orderId = response.payOrderId
        this.qrCodeDialogVisible = true
      })
    },
    handleReport(row) {
      this.dialogReportVisible = true
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
    },
    reportData() {
      this.dialogReportVisible = false
      accountReport({
        aliid: this.formData.accountId,
        startDate: this.paging.query.dates
      }).then(response => {
        if (typeof response !== 'undefined') {
          var link = document.createElement('a')
          link.href = response
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
    },
    handleDownload() {
      window.open('./static/file-templates/AddAccountListTemplate.csv')
    },
    // 重組 dataForm
    normalizeDataForm() {
      const {
        vendorId,
        accountName,
        // thirdMerchantName,
        thirdMerchantId,
        publicKey,
        privateKey,
        thirdMerchantSign,
        status,
        memo,
        accountChannelList,
        accountId,
        orderOriginationUrl,
        orderQueryUrl,
        balanceQueryUrl,
        traceStatus
      } = this.formData

      const list = accountChannelList
        .map(
          ({
            action,
            accountChannelId,
            channelId,
            singleMinAmount,
            singleMaxAmount,
            singleDayAmount,
            singleDayCount,
            status,
            singleFixedAmountList,
            thirdChannelCode
          }) => {
            // 濾掉不是空字串
            const singleFixedAmount = singleFixedAmountList.filter((o) => o.value !== '').map((o) => moneyToCent(delcommafy(o.value))).join(',')
            return {
              action,
              channelId,
              singleMinAmount: moneyToCent(delcommafy(singleMinAmount)),
              singleMaxAmount: moneyToCent(delcommafy(singleMaxAmount)),
              singleDayAmount: moneyToCent(delcommafy(singleDayAmount)),
              singleDayCount: parseInt(delcommafy(singleDayCount)),
              accountChannelId,
              accountId,
              status,
              singleFixedAmount,
              thirdChannelCode
            }
          }
        )
        .sort(o => {
          // 要把action === delete 的放在第一個排序
          return o.action !== ActionType.DELETE ? 1 : -1
        })

      // 如果 user 自行清除就不用幫他帶入 default 資料
      // 濾 url 出來
      // const urlItem = this.vendorList.find(item => {
      //   return item.id === vendorId
      // })

      // let newOrderOriginationUrl = ''
      // let newOrderQueryUrl = ''
      // let newBalanceQueryUrl = ''

      // if (urlItem) {
      //   // 如果沒有輸入且default 有資料的話自動幫帶入 default 資料
      //   const {
      //     orderOriginationUrl: oldOrderOriginationUrl,
      //     orderQueryUrl: oldOrderQueryUrl,
      //     balanceQueryUrl: oldBalanceQueryUrl
      //   } = urlItem
      //   newOrderOriginationUrl = orderOriginationUrl || oldOrderOriginationUrl
      //   newOrderQueryUrl = orderQueryUrl || oldOrderQueryUrl
      //   newBalanceQueryUrl = balanceQueryUrl || oldBalanceQueryUrl
      // } else {
      //   newOrderOriginationUrl = orderOriginationUrl
      //   newOrderQueryUrl = orderQueryUrl
      //   newBalanceQueryUrl = balanceQueryUrl
      // }

      return {
        accountId,
        vendorId,
        accountName,
        publicKey,
        privateKey,
        // thirdMerchantName,
        thirdMerchantId,
        thirdMerchantSign,
        status,
        traceStatus,
        memo,
        accountChannelList: list,
        orderOriginationUrl,
        orderQueryUrl,
        balanceQueryUrl

        // orderOriginationUrl: newOrderOriginationUrl,
        // orderQueryUrl: newOrderQueryUrl,
        // balanceQueryUrl: newBalanceQueryUrl
      }
    },
    createData() {
      const validaKey = this.checkKey()
      this.$refs['dataForm'].validate(valid => {
        if (valid && this.checkAccountChannelList() && validaKey) {
          // // 重組 api 用 data
          const data = this.normalizeDataForm()
          addNewAccount(data).then(res => {
            this.getList(true)
            this.getAccountOption()
          })
          // addAccount(this.formData).then(() => {
          //   this.getList(true)
          // })
          this.adjustChannelType()
          this.normalizeAmount()
          this.dialogFormVisible = false
        }
      })
    },
    updateData() {
      const validaKey = this.checkKey()
      this.$refs['dataForm'].validate(valid => {
        if (valid && this.checkAccountChannelList() && validaKey) {
          const data = this.normalizeDataForm()
          data.action = 'INFO'

          updateNewAccount(data).then(() => {
            this.getList(true)
            this.getAccountOption()
          })
          // updateAccount(this.formData).then(() => {
          //   this.getList(true)
          // })
          this.adjustChannelType()
          this.normalizeAmount()

          this.dialogFormVisible = false
        }
      })
    },
    adjustChannelType() {
      const channelTypeList = []
      if (this.formData.pcType) {
        channelTypeList.push(this.formData.pcType)
      }
      if (this.formData.wapType) {
        channelTypeList.push(this.formData.wapType)
      }
      this.formData.channelTypeList = channelTypeList
    },
    normalizeAmount() {
      this.formData.minAmount = moneyToCent(this.formData.minAmount)
      this.formData.maxAmount = moneyToCent(this.formData.maxAmount)
      this.formData.dayMaxAmount = moneyToCent(this.formData.dayMaxAmount)
      this.formData.costFixedAmount = moneyToCent(this.formData.costFixedAmount)
      if (this.formData.specifiedAmountList) {
        this.formData.specifiedAmountList = this.formData.specifiedAmountList.map(amount => moneyToCent(amount))
      }
    },
    // 金流商
    queryVendorList() {
      return getVendorList().then(response => {
        this.vendorList = response.map(
          ({ vendorId, vendorName, balanceQueryUrl, orderOriginationUrl, orderQueryUrl }) => {
            return {
              id: vendorId,
              name: vendorName,
              balanceQueryUrl,
              orderOriginationUrl,
              orderQueryUrl
            }
          }
        )
      })
    },
    // 屬於該金流商的渠道
    queryVendorChannelList(id) {
      return new Promise(resolve => {
        try {
          return getVendorChannelList({ vendorId: id }).then(response => {
            this.vendorChannelList = response.map(({ channelId, channelName, thirdChannelCode }) => {
              return {
                id: channelId,
                name: channelName,
                thirdChannelCode
              }
            })
            resolve([this.vendorChannelList])
          }).catch(() => {
            resolve([])
          })
        } catch (error) {
          resolve([])
        }
      })
    },
    queryChannelList() {
      return getChannelIndexing().then(response => {
        this.channelList = response
          .filter(res => !Object.values(ChannelCodeWithoutAccount).find(value => value === res.channelCode))
          .map(res => ({ id: res.channelCode, name: res.channelName }))

        if (!this.paging.query.channelCode && response) {
          const channel = response.find(res => res.channelCode === ChannelCode.AliPay)
          this.paging.query.channelCode = channel ? channel.channelCode : ''
          this.getList()
        }

        this.onChangeChannelCode(this.paging.query.channelCode)
      })
    },
    queryBankCardList() {
      getBankCardIndexing({ type: BankCardType.PaymentCard }).then(response => {
        this.bankCardList = response.map(res => ({
          id: res.bankCardId,
          name: res.cardId
        }))
      })
    },
    async onChangeVendorId(id) {
      // 當是在新增情況下只要當金流商下拉選單異動才需要清空添加列表的渠道
      if (this.formData.accountChannelList.length > 0 && this.dialogType === DialogType.Create) {
        this.formData.accountChannelList = this.formData.accountChannelList.map(o => {
          return {
            ...o,
            channelId: ''
          }
        })
      }
      if (id === undefined || id === null || id === '') {
        return
      }

      const urlItem = this.vendorList.find(item => {
        return item.id === id
      })

      if (urlItem && this.dialogType === DialogType.Create) {
        const { balanceQueryUrl, orderOriginationUrl, orderQueryUrl } = urlItem
        this.formData.balanceQueryUrl = balanceQueryUrl
        this.formData.orderOriginationUrl = orderOriginationUrl
        this.formData.orderQueryUrl = orderQueryUrl
      }

      await this.queryVendorChannelList(id)
      this.formData.vendorCode = id
    },
    onChangeChannel(channelCode) {
      if (!channelCode) {
        return
      }
      const list = AccountCodeList.filter(accountCode => accountCode.channelCode === channelCode)
      const options = list.map(a => ({
        id: a.accountCode,
        name: a.accountCode
      }))
      this.$set(this, 'accountCodeOptions', options)
      if (!this.formData.accountCode) {
        if (list && list.length > 0) {
          this.formData.accountCode = list[0].accountCode
        }
      }
    },
    onChangeQueryVenderId(id) {
      // 不需要連動下拉選單資料 故移除
      // if (id === undefined || id === null || id === '') {
      //   this.$set(this, 'accountListByVendor', [])
      //   this.paging.query.accountId = ''
      //   return
      // }
      // 不需要連動下拉選單資料 故移除
      // this.queryAccoutListByVendor(id)
      this.paging.query.vendorId = id
    },
    queryAccoutListByVendor(vendorId) {
      getAccountListByVendor({ vendorId }).then(res => {
        if (res && res.length > 0) {
          this.accountListByVendor = res.map(({ accountId, accountName }) => {
            return {
              id: accountId,
              name: accountName
            }
          })
        }
      })
    },
    onChangeChannelCode(channelCode) {
      this.$set(this.paging.query, 'accountCode', undefined)
      this.accountCodeList = AccountCodeList.filter(a => a.channelCode === channelCode).map(a => ({
        id: a.accountCode,
        name: a.accountCode
      }))
    },
    onUploadSuccess(response) {
      if (response.code === 200) {
        showSuccess()
      } else {
        showFailure(`Code: ${response.code}, ${response.message}`)
      }
    },
    onUploadError() {
      showFailure()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-select.el-select--medium {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
}

.show-pwd {
  cursor: pointer;
  margin: 0 5px;
}
</style>

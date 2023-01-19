<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <bs-select v-model="paging.query.merchantId" :options="merchantList" v-if="isSuperAdmin()" filterable
          :placeholder="$t('merchantList.merchant')" v-permission="[Permission.IndexingMerchantall]" />
        <bs-select v-model="paging.query.vendorId" :options="vendorList"
          :placeholder="$t('withdrawChannelList.vendorName')" filterable />
        <!-- <bs-input v-model="paging.query.accountName" :placeholder="$t('accountList.accountName')" /> -->
        <bs-select v-model="paging.query.accountId" :options="accountList"
          :placeholder="$t('withdrawChannelList.accountName')" filterable />
        <bs-select v-model="paging.query.statusList" :options="AccountStatusOptions" :placeholder="$t('status.status')"
          :multiple="true" />
        <!-- 追蹤狀態 -->
        <bs-select v-model="paging.query.traceStatus" :options="StatusOptions"
          :placeholder="$t('withdrawChannelList.traceStatus')" v-if="isSuperAdmin()" />

        <!-- 連線狀態 -->
        <bs-select v-model="paging.query.connStatus" :options="ConnectStatusOptions"
          :placeholder="$t('withdrawChannelList.connectStatus')" v-if="isSuperAdmin()" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.WithdrawChannelList]" />
        <bs-add-button @click="handleCreate" v-permission="[Permission.WithdrawChannelAdd]" />
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')"
        @sort-change="onSortChange" border fit highlight-current-row v-permission="[Permission.WithdrawChannelList]"
        style="width: 100%" ref="table">
        <el-table-column :label="$t('table.id')" min-width="50%">
          <template slot-scope="scope">{{scope.row.accountId}}</template>
        </el-table-column>
        <el-table-column :label="$t('merchantList.merchant')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <bs-merchant-link :merchant-id="scope.row.merchantId">{{ scope.row.merchantId }}</bs-merchant-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('withdrawChannelList.vendorName')">
          <template slot-scope="scope">{{scope.row.vendorName}}</template>
        </el-table-column>
        <el-table-column :label="$t('withdrawChannelList.accountName')">
          <template slot-scope="scope">{{scope.row.accountName}}</template>
        </el-table-column>
        <el-table-column prop="balance" sortable="custom" :label="$t('withdrawChannelList.balance')">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>
        <el-table-column :label="$t('withdrawChannelList.channelMerchantId')">
          <template slot-scope="scope">{{scope.row.channelMerchantId}}</template>
        </el-table-column>
        <!-- 支付公钥 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.publicKey')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.publicKey" :size="30" />
          </template>
        </el-table-column>-->
        <!-- 私付公钥 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.privateKey')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.privateKey" :size="30" />
          </template>
        </el-table-column>-->

        <!-- 第三方密鑰 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.thirdMerchantSign')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.thirdMerchantSign" :size="30" />
          </template>
        </el-table-column>-->

        <!-- 订单发起URL -->
        <!-- <el-table-column :label="$t('withdrawChannelList.orderOriginationUrl')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.orderOriginationUrl" :size="30" />
          </template>
        </el-table-column>-->
        <!-- 订单查询URL -->
        <!-- <el-table-column :label="$t('withdrawChannelList.orderQueryUrl')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.orderQueryUrl" :size="30" />
          </template>
        </el-table-column>-->
        <!-- 余额查询URL -->
        <!-- <el-table-column :label="$t('withdrawChannelList.balanceQueryUrl')">
          <template slot-scope="scope">
            <bs-ellipsis :value="scope.row.balanceQueryUrl" :size="30" />
          </template>
        </el-table-column>-->

        <!-- <el-table-column :label="$t('withdrawChannelList.preCatchBalance')">
          <template slot-scope="scope">{{scope.row.preCatchBalance | money}}</template>
        </el-table-column>-->
        <!-- 单笔限额 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.payAmount')">
          <template
            slot-scope="scope"
          >{{scope.row.minAmount | money}} - {{scope.row.maxAmount | money}}</template>
        </el-table-column>-->
        <!-- 单日限额 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.dayMaxAmount')">
          <template slot-scope="scope">{{scope.row.dayMaxAmount | money}}</template>
        </el-table-column>-->
        <!-- 单日限笔 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.dayMaxCount')">
          <template slot-scope="scope">{{scope.row.dayMaxCount | count}}</template>
        </el-table-column>-->
        <!-- 渠道可用星期 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.openDay')" min-width="120%">
          <template slot-scope="scope">{{getColDayName(scope.row.openDays)}}</template>
        </el-table-column>-->
        <!-- 渠道可用时段 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.channelTime')" min-width="120%">
          <template slot-scope="scope">{{scope.row.openStartTime}} - {{scope.row.openEndTime}}</template>
        </el-table-column>-->
        <!-- 代付银行 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.bank')">
          <template slot-scope="scope">
            <bs-ellipsis :value="getColBankName(scope.row.useBankList)" :size="30" />
          </template>
        </el-table-column>-->
        <!-- 代付手续费 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.serviceFeeType')">
          <template slot-scope="scope">{{getColServiceFeeType(scope.row.serviceFeeType)}}</template>
        </el-table-column>-->
        <!-- 更新時間 -->
        <el-table-column prop="updateTime" sortable="custom" :label="$t('timestamp.updateTime')">
          <template slot-scope="scope">{{scope.row.updateTime | moment}}</template>
        </el-table-column>

        <!-- 餘額 -->
        <!-- <el-table-column :label="$t('withdrawChannelList.balance')">
          <template slot-scope="scope">{{scope.row.balance | money}}</template>
        </el-table-column>-->
        <el-table-column :label="$t('status.status')">
          <template slot-scope="scope">
            <bs-account-status :status="scope.row.status" :memo="scope.row.memo"
              @on-click-submit="changeStatus(scope.row, $event)"
              :clickable="hasAcl(Permission.WithdrawChannelUpdate)" />
          </template>
        </el-table-column>

        <!-- 追蹤狀態 -->
        <el-table-column :label="$t('withdrawChannelList.traceStatus')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <bs-status :title="$t('dialog.update') + $t('withdrawChannelList.traceStatus')"
              @on-click-submit="changeTraceStatus(scope.row, $event)" :status="scope.row.traceStatus"
              :clickable="hasAcl(Permission.AccountUpdate) && hasAcl(Permission.WithdrawChannelTraceStatusUpdate)" />
          </template>
        </el-table-column>

        <!-- 連線狀態 -->
        <el-table-column :label="$t('withdrawChannelList.connectStatus')" v-if="isSuperAdmin()">
          <template slot-scope="scope">
            <el-tag class="text" :type="getConnectStatusText(scope.row.connStatus).color">
              {{ getConnectStatusText(scope.row.connStatus).name }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- 刷新时间 -->
        <el-table-column :label="$t('table.refreshTime')" v-if="isSuperAdmin()">
          <template slot-scope="scope">{{ scope.row.connRefreshTime | moment }}</template>
        </el-table-column>
        <el-table-column :label="$t('withdrawChannelList.memo')">
          <template slot-scope="scope">
            <!-- {{scope.row.memo}} -->
            <bs-ellipsis :value="scope.row.memo" :size="30" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" fixed="right" min-width="170%">
          <template slot-scope="scope">
            <bs-edit-button @click="handleModify(scope.row)" v-permission="[Permission.WithdrawChannelUpdate]" />
            <bs-spinning-button-with-counter v-if="timers.find(o => o.id === scope.row.accountId) !== undefined"
              :title="$t('button.refreshBalance')" @click="handleRefresh(scope.row)" :accountId="scope.row.accountId"
              :timer="timers.find(o => o.id === scope.row.accountId)" :timers="timers" class="remove-m-l" />
            <bs-spinning-button-nocounter v-else :title="$t('button.refreshBalance')" @click="handleRefresh(scope.row)"
              :accountId="scope.row.accountId" class="remove-m-l" />

            <!-- 連線刷新 -->
            <bs-button v-if="isSuperAdmin()" :title="$t('table.refreshConnect')"
              @click="handleConnectRefresh(scope.row)" v-permission="[Permission.WithdrawChannelCheckConnection]"
              class="remove-m-l" />
            <!-- <bs-spinning-button :title="$t('withdrawChannelList.refreshBalance')" @click="handleRefresh(scope.row)"
            v-permission="[Permission.WithdrawChannelRefresh]" class="remove-m-l" />-->
            <!-- <bs-button :title="$t('withdrawChannelList.testWithdrawChannel')" @click="handleTestAccount(scope.row)"
            v-permission="[Permission.WithdrawChannelTest]" class="remove-m-l" />-->
            <!-- <bs-button
              :title="$t('withdrawChannelList.withdrawSetting')"
              @click="handleWithdrawSetting(scope.row)"
              v-permission="[Permission.WithdrawChannelSetting]"
              class="remove-m-l"
            />-->
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.size" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />
    </div>

    <el-dialog :title="DialogTypeOptions[dialogType].name" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
      :close-on-click-modal="false" :show-close="true" width="60%">
      <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="140px">
        <el-form-item :label="$t('withdrawChannelList.vendorName')" prop="catchId">
          <!-- <bs-input v-model="formData.catchId" /> -->
          <bs-select v-model="formData.catchId" filterable :options="catchIdOptions" :clearable="false"
            @change="findBankListByVendor" v-permission="[Permission.IndexingWithdrawVendor]"
            :disabled="dialogType === DialogType.Update" />
        </el-form-item>
        <el-form-item :label="$t('withdrawChannelList.accountName')" prop="accountName">
          <bs-input v-model="formData.accountName" />
        </el-form-item>
        <!-- <el-form-item
          :label="$t('withdrawChannelList.channelMerchantName')"
          prop="channelMerchantName"
        >
          <bs-input v-model="formData.channelMerchantName" />
        </el-form-item>-->
        <el-form-item :label="$t('withdrawChannelList.channelMerchantId')" prop="channelMerchantId">
          <bs-input v-model="formData.channelMerchantId" />
        </el-form-item>
        <!-- 第三方密钥 -->
        <el-form-item :label="$t('withdrawChannelList.thirdMerchantSign')" prop="thirdMerchantSign">
          <el-input style="width:auto" :type="thirdMerchantSignType" v-model="formData.thirdMerchantSign"
            :placeholder="$t('withdrawChannelList.thirdMerchantSign')" :disabled="thirdMerchantSignDisable" />
          <span class="show-pwd" @click="changePasswordType('thirdMerchantSignType')">
            <svg-icon icon-class="eye" />
          </span>
          <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.thirdMerchantSign" />
          <bs-button :title="$t('withdrawChannelList.resetting')" @click="resetKey('thirdMerchantSign')" />
        </el-form-item>

        <!-- <el-form-item :label="$t('accountList.publicKey')" prop="publicKey">
          <el-input
            style="width:auto"
            :type="publicKeyType"
            v-model="formData.publicKey"
            :placeholder="$t('accountList.publicKey')"
            :disabled="publicKeyDisable"
          />
          <span class="show-pwd" @click="changePasswordType('publicKeyType')">
            <svg-icon icon-class="eye" />
          </span>
          <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.publicKey" />
          <bs-button title="重新設定" @click="resetKey('publicKey')" />
        </el-form-item>-->

        <!-- 登入账号 -->
        <!-- <el-form-item :label="$t('accountList.loginUsername')" prop="loginUsername">
          <bs-input v-model="formData.loginUsername"/>
        </el-form-item>-->
        <!-- 登入密码 -->
        <!-- <el-form-item :label="$t('accountList.loginPassword')" prop="loginPassword">
          <bs-input v-model="formData.loginPassword"/>
        </el-form-item>-->

        <el-form-item :label="$t('withdrawChannelList.orderOriginationUrl')" prop="orderOriginationUrl">
          <bs-input v-model="formData.orderOriginationUrl" :placeholder="$t('accountList.defaultThirdUrl')"
            class="urlInput" />
        </el-form-item>
        <el-form-item :label="$t('withdrawChannelList.orderQueryUrl')" prop="orderQueryUrl">
          <bs-input v-model="formData.orderQueryUrl" :placeholder="$t('accountList.defaultThirdUrl')"
            class="urlInput" />
        </el-form-item>
        <!-- 餘額查詢 URL -->
        <el-form-item :label="$t('withdrawChannelList.balanceQueryUrl')" prop="balanceQueryUrl">
          <bs-input :disabled="formData.supportQueryBalance === false" v-model="formData.balanceQueryUrl"
            :placeholder="formData.supportQueryBalance === false ? $t('withdrawChannelList.emptyBalanceQueryUrl') : $t('accountList.defaultThirdUrl')"
            class="urlInput" />
        </el-form-item>

        <!-- 金流方公钥 -->
        <el-form-item :label="$t('withdrawChannelList.publicKey')" prop="publicKey">
          <!-- <bs-text-area v-model="formData.publicKey" :placeholder="$t('accountList.publicKey')" /> -->
          <el-input style="width:auto" :type="publicKeyType" v-model="formData.publicKey"
            :placeholder="$t('withdrawChannelList.publicKey')" :disabled="publicKeyDisable" />
          <span class="show-pwd" @click="changePasswordType('publicKeyType')">
            <svg-icon icon-class="eye" />
          </span>
          <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.publicKey" />
          <bs-button :title="$t('withdrawChannelList.resetting')" @click="resetKey('publicKey')" />
        </el-form-item>

        <!-- 金流方私钥 -->
        <el-form-item :label="$t('withdrawChannelList.privateKey')" prop="privateKey">
          <!-- <bs-text-area v-model="formData.privateKey" :placeholder="$t('accountList.privateKey')" /> -->
          <el-input style="width:auto" :type="privateKeyType" v-model="formData.privateKey"
            :placeholder="$t('withdrawChannelList.privateKey')" :disabled="privateKeyDisable" />
          <span class="show-pwd" @click="changePasswordType('privateKeyType')">
            <svg-icon icon-class="eye" />
          </span>
          <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.privateKey" />
          <bs-button :title="$t('withdrawChannelList.resetting')" @click="resetKey('privateKey')" />
        </el-form-item>

        <!-- 额外配置参数 -->
        <!-- 先隱藏 -->
        <!-- <el-form-item :label="$t('withdrawChannelList.channelExtra')" prop="channelExtra">
          <el-input
            style="width:auto"
            :type="channelExtraType"
            v-model="formData.channelExtra"
            :placeholder="$t('withdrawChannelList.channelExtra')"
            :disabled="channelExtraDisable"
          />
          <span class="show-pwd" @click="changePasswordType('channelExtraType')">
            <svg-icon icon-class="eye" />
          </span>
          <bs-button :title="$t('table.copy')" v-clipboard:copy="formData.channelExtra" />
          <bs-button
            :title="$t('withdrawChannelList.resetting')"
            @click="resetKey('channelExtra')"
          />
        </el-form-item>-->

        <!-- 单笔限额 -->
        <el-form-item :label="$t('withdrawChannelList.payAmount')" prop="payAmount">
          <bs-input :placeholder="$t('withdrawChannelList.minAmount')" v-model="formData.minAmount"
            @blur="inputMoney($event, formData, 'minAmount')" />~
          <bs-input :placeholder="$t('withdrawChannelList.maxAmount')" v-model="formData.maxAmount"
            @blur="inputMoney($event, formData, 'maxAmount')" />
        </el-form-item>

        <!-- 代付手續費 -->
        <!-- <el-form-item :label="$t('withdrawChannelList.serviceFeeType')" prop="serviceFeeType">
          <el-radio
            v-model="formData.serviceFeeType"
            label="0"
            @change="handleServiceFeeType"
          >{{$t('withdrawChannelList.serviceFeeTypeA')}}</el-radio>
          <el-radio
            v-model="formData.serviceFeeType"
            label="1"
            @change="handleServiceFeeType"
          >{{$t('withdrawChannelList.serviceFeeTypeB')}}</el-radio>
        </el-form-item>-->

        <!-- 成本 (選擇"從出款金額扣除"才顯示成本欄位) -->
        <!-- <el-form-item :label="$t('withdrawChannelList.cost')" prop="cost">
          <bs-input v-model="formData.costRate" @blur="inputMoney($event, formData, 'costRate')" />% +
          <bs-input
            v-model="formData.costFixedAmount"
            @blur="inputMoney($event, formData, 'costFixedAmount')"
          />
        </el-form-item>-->
        <!-- 單筆最低 -->
        <!-- <el-form-item :label="$t('accountList.minPayAmount')" prop="minAmount">
          <bs-input v-model="formData.minAmount"/>
        </el-form-item>-->
        <!-- 單筆最高 -->
        <!-- <el-form-item :label="$t('accountList.maxPayAmount')" prop="maxAmount">
          <bs-input v-model="formData.maxAmount"/>
        </el-form-item>-->

        <!-- 單日達標金額 -->
        <el-form-item :label="$t('withdrawChannelList.dayMaxPayAmount')" prop="dayMaxAmount">
          <bs-input v-model="formData.dayMaxAmount" @blur="inputMoney($event, formData, 'dayMaxAmount')" />
        </el-form-item>
        <!-- 單日達標筆數 -->
        <el-form-item :label="$t('withdrawChannelList.dayMaxPayCount')" prop="dayMaxCount">
          <bs-input v-model="formData.dayMaxCount" @blur="inputMoney($event, formData, 'dayMaxCount')" />
        </el-form-item>
        <!-- 可用星期 -->
        <el-form-item :label="$t('withdrawChannelList.openDay')" prop="openDays">
          <bs-select v-model="formData.openDays" :options="DayOptions" :multiple="true" :clearable="false" />
        </el-form-item>
        <!-- 可用時段 -->
        <el-form-item :label="$t('withdrawChannelList.openTime')" prop="openTime">
          <el-time-picker :placeholder="$t('dateTimePicker.startTime')" v-model="formData.openStartTime"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" :clearable="false" :editable="false"
            format="HH:mm:ss" value-format="HH:mm:ss" style="margin-right: 10px;"></el-time-picker>
          <span>-</span>
          <el-time-picker :placeholder="$t('dateTimePicker.endTime')" v-model="formData.openEndTime"
            :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" :clearable="false" :editable="false"
            format="HH:mm:ss" value-format="HH:mm:ss"></el-time-picker>
        </el-form-item>

        <!-- 狀態 -->
        <el-form-item :label="$t('status.status')" prop="status">
          <bs-select v-model="formData.status" :options="AccountStatusOptions" :clearable="false" />
        </el-form-item>

        <!-- 追蹤狀態 -->
        <el-form-item :label="$t('withdrawChannelList.traceStatus')" prop="traceStatus" v-if="isSuperAdmin()">
          <bs-select v-model="formData.traceStatus" :options="StatusOptions" :clearable="false" />
        </el-form-item>

        <!-- 代付银行 -->
        <!-- <el-form-item
          :label="$t('withdrawChannelList.bank')"
          prop="checkedBankCodes"
          v-if="dialogType===DialogType.Create"
        >
          <el-checkbox
            :indeterminate="formData.isIndeterminate"
            v-model="formData.checkAllBanks"
            @change="handleCheckAllBankChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="formData.checkedBankCodes" @change="handleCheckedBankChange">
            <el-checkbox
              v-for="(bank) in bankList"
              :label="bank.bankCode"
              :key="bank.bankCode"
            >{{bank.bankName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>-->
        <el-form-item :label="$t('withdrawChannelList.bank')">
          <div style="display: flex; flex-wrap: wrap;" v-if="bankListByVendor.length > 0">
            <div v-for="(bank, index) in bankListByVendor" :label="bank.bankCode" :key="bank.bankCode + index"
              style="width: 50%">{{bank.bankName}}</div>
          </div>
          <div v-else>
            {{ $t('withdrawChannelList.emptyBankChannelList') }}
          </div>
        </el-form-item>

        <!-- 備註 -->
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

    <el-dialog :title="$t('withdrawChannelList.createTestOrder')" :visible.sync="testDialogFormVisible"
      v-if="testDialogFormVisible" :close-on-click-modal="false" :show-close="true" width="60%">
      <el-form :rules="rules" ref="dataForm" :model="testedFormData" label-position="left" label-width="140px">
        <el-form-item :label="$t('table.id')">{{testedWithdrawChannel.accountId}}</el-form-item>
        <el-form-item :label="$t('withdrawChannelList.accountName')">{{testedWithdrawChannel.accountName}}
        </el-form-item>
        <el-form-item :label="$t('withdrawChannelList.catchId')">{{testedWithdrawChannel.catchId}}</el-form-item>
        <el-form-item :label="$t('payOrderList.amount')" prop="amount">
          <bs-input v-model="testedFormData.amount" />
        </el-form-item>
        <el-form-item :label="$t('bankCard.payeeCardName')" prop="payeeCardName">
          <bs-input v-model="testedFormData.payeeCardName" />
        </el-form-item>
        <el-form-item :label="$t('bankCard.payeeCardNo')" prop="payeeCardNo">
          <bs-input v-model="testedFormData.payeeCardNo" />
        </el-form-item>
        <el-form-item :label="$t('bankCard.bankName')" prop="bankCode">
          <bs-select v-model="testedFormData.bankCode" :options="getBankSelectionOption()" />
        </el-form-item>
        <el-form-item :label="$t('bankCard.branchName')" prop="branchName">
          <bs-input v-model="testedFormData.branchName" />
        </el-form-item>
        <el-form-item :label="$t('withdrawChannelList.bankProvince')" prop="bankProvince">
          <bs-input v-model="testedFormData.bankProvince" />
        </el-form-item>
        <el-form-item :label="$t('withdrawChannelList.bankCity')" prop="bankCity">
          <bs-input v-model="testedFormData.bankCity" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <bs-cancel-button @click="testDialogFormVisible=false" />
        <bs-submit-button @click="testWithdrawChannel" />
      </div>
    </el-dialog>

    <el-dialog :title="$t('withdrawChannelList.bank')" :visible.sync="settingDialogFormVisible"
      v-if="settingDialogFormVisible" :close-on-click-modal="false" :show-close="true" width="60%">
      <el-form :rules="rules" ref="dataForm" :model="settingFormData" label-position="left" label-width="140px">
        <el-form-item :label="$t('withdrawChannelList.bank')" prop="checkedBankCodes">
          <el-checkbox :indeterminate="settingFormData.isIndeterminate" v-model="settingFormData.checkAllBanks"
            @change="handleCheckAllBankChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="settingFormData.checkedBankCodes" @change="handleCheckedBankChange">
            <el-checkbox v-for="(bank) in bankList" :label="bank.bankCode" :key="bank.bankCode">{{bank.bankName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <bs-cancel-button @click="settingDialogFormVisible=false" />
        <bs-submit-button @click="settingDialogFormSubmit" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  // AccountStatus,
  DialogType,
  Permission,
  Status,
  WithdrawChannelUrlType
} from '@/definitions/constants'
import {
  AccountStatusOptions,
  DialogTypeOptions,
  DayOptions,
  StatusOptions,
  ConnectStatusOptions
} from '@/definitions/options'
import { Rules, Regex } from '@/definitions/fieldCheck'
import { buildTimer } from '@/utils/buildTimer'
import {
  addWithdrawChannel,
  getWithdrawChannelList,
  getWithdrawChannelAllList,
  // refreshWithdrawChannel,
  testWithdrawChannel,
  updateWithdrawChannel,
  getWithdrawBanks,
  refreshBalanceFromVendor,
  updateTraceStatus,
  getCheckConnection
} from '@/api/withdrawChannel'
import { deepClone, objectMerge } from '@/utils'
import { delcommafy, getInputValue, moneyToCent, moneyToDollar } from '@/utils/money'
import { showSuccess } from '@/utils/executionMessage'
import { hasAcl } from '@/utils/auth'
import { trancateText } from '@/utils/string'
import { getColDayName, getColServiceFeeType } from '@/utils/colData'
import moment from 'moment'
import { getALLWithdrawVendorIndexing, getBankListByVendor } from '@/api/indexing'
import clipboard from '@/directive/clipboard'
import { isSuperAdminLevel } from '@/utils/user'
import { getMerchantIndexingAll } from '@/api/indexing'
import { str } from '@/utils/string'

export default {
  name: 'withdrawChannelList',
  directives: {
    clipboard
  },
  data() {
    return {
      catchIdOptions: [],
      settingFormData: {},
      settingDialogFormVisible: false,
      getColServiceFeeType,
      getColDayName,
      bankList: [], // 所有 bank list
      timers: [],
      DayOptions,
      trancateText,
      moment,
      Permission,
      dialogFormVisible: false,
      testDialogFormVisible: false,
      DialogType,
      dialogType: 0,
      DialogTypeOptions,
      ConnectStatusOptions,
      StatusOptions,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: undefined,
          statusList: [
            // AccountStatus.Enabled,
            // AccountStatus.ReachedLimit,
            // AccountStatus.Cooling,
            // AccountStatus.CoolingAmount
          ],
          traceStatus: undefined, // 追蹤狀態
          connStatus: undefined // 連線狀態
        }
      },
      rules: {
        traceStatus: [...Rules.requiredBlur],
        branchName: [...Rules.branchName],
        bankProvince: [...Rules.bankProvince],
        bankCity: [...Rules.bankCity],
        openDays: [...Rules.requiredBlur],
        serviceFeeType: [...Rules.requiredBlur],
        checkedBankCodes: [...Rules.requiredBlur, ...Rules.requiredChange],
        accountName: [...Rules.requiredBlur, ...Rules.channelName],
        catchId: [...Rules.requiredBlur],
        channelMerchantId: [...Rules.requiredBlur, ...Rules.noSpace],
        channelMerchantName: [...Rules.requiredBlur, ...Rules.name],
        publicKey: [...Rules.noSpace],
        privateKey: [...Rules.noSpace],
        channelExtra: [{ required: false, trigger: 'blur' }],
        thirdMerchantSign: [...Rules.thirdKey, ...Rules.noSpace, ...Rules.noChinese],
        loginUsername: [...Rules.requiredBlur],
        loginPassword: [...Rules.requiredBlur],
        orderOriginationUrl: [...Rules.url],
        orderQueryUrl: [...Rules.url],
        balanceQueryUrl: [...Rules.url],
        cost: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const costRateStr = delcommafy(this.formData.costRate)
              const costFixedAmountStr = delcommafy(this.formData.costFixedAmount)

              if (!costRateStr && !costFixedAmountStr) {
                callback(this.$t('rules.required'))
              }
              if (!Regex.floating.test(costRateStr) || !Regex.floating.test(costFixedAmountStr)) {
                // 輸入不是數字
                callback(this.$t('rules.onlyNumber'))
              }
              // 成本百分比須介於 0~100
              if (parseFloat(costRateStr) < 0 || parseFloat(costRateStr) > 100) {
                callback(this.$t('rules.costRateLength'))
              }
              // 成本須介於 0 到 100,000,000
              if (parseFloat(costFixedAmountStr) < 0 || parseFloat(costFixedAmountStr) > 100000000) {
                callback(this.$t('rules.costFixedAmountLength'))
              }
              callback()
            }
          }
        ],
        payAmount: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const singleMinAmountStr = delcommafy(this.formData.minAmount)
              const singleMaxAmountStr = delcommafy(this.formData.maxAmount)
              if (!singleMinAmountStr || !singleMaxAmountStr) {
                callback(this.$t('rules.required'))
              }

              // 单笔限额
              if (!Regex.floating.test(singleMinAmountStr) || !Regex.floating.test(singleMaxAmountStr)) {
                // 輸入不是數字
                callback(this.$t('rules.onlyNumber'))
              }

              // 单笔限额-下限範圍
              if (parseFloat(singleMinAmountStr) < 1 || parseFloat(singleMinAmountStr) > 100000000) {
                callback(this.$t('rules.minAmountLength'))
              }
              // 单笔限额-上限範圍
              if (parseFloat(singleMaxAmountStr) < 1 || parseFloat(singleMaxAmountStr) > 100000000) {
                callback(this.$t('rules.maxAmountLength'))
              }

              // 单笔限额-下限大於上限
              if (parseFloat(singleMinAmountStr) > parseFloat(singleMaxAmountStr)) {
                callback(this.$t('rules.minGTRMaxAmount'))
              }

              // if (!isNumber.test(this.formData.minAmount) || !isNumber.test(this.formData.maxAmount)) {
              //   callback(this.$t('rules.amount'))
              // }
              // // 单笔限额-下限範圍
              // if (parseInt(this.formData.minAmount) > 1000000 || parseInt(this.formData.minAmount) < 1) {
              //   callback(this.$t('rules.minAmountLength'))
              // }
              // // 单笔限额-上限範圍
              // if (parseInt(this.formData.maxAmount) > 1000000 || parseInt(this.formData.maxAmount) < 1) {
              //   callback(this.$t('rules.maxAmountLength'))
              // }
              // // 单笔限额-下限大於上限
              // if (parseInt(this.formData.minAmount) > parseInt(this.formData.maxAmount)) {
              //   callback(this.$t('rules.minGTRMaxAmount'))
              // }
              callback()
            }
          }
        ],
        minAmount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const minPayAmountNumber = parseInt(value)
              const maxPayAmountNumber = parseInt(this.formData.maxAmount)
              const dayMaxPayAmountNumber = parseInt(this.formData.dayMaxAmount)
              if (minPayAmountNumber > maxPayAmountNumber || minPayAmountNumber > dayMaxPayAmountNumber) {
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
              const minPayAmountNumber = parseInt(this.formData.minAmount)
              const maxPayAmountNumber = parseInt(value)
              const dayMaxPayAmountNumber = parseInt(this.formData.dayMaxAmount)
              if (maxPayAmountNumber < minPayAmountNumber || maxPayAmountNumber > dayMaxPayAmountNumber) {
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
              const singleDayAmountStr = delcommafy(value)
              const singleMinAmountStr = delcommafy(this.formData.minAmount)
              const singleMaxAmountStr = delcommafy(this.formData.maxAmount)

              const minPayAmountNumber = parseFloat(singleMinAmountStr)
              const maxPayAmountNumber = parseFloat(singleMaxAmountStr)
              const dayMaxPayAmountNumber = parseFloat(singleDayAmountStr)

              if (!Regex.floating.test(singleDayAmountStr)) {
                callback(this.$t('rules.amount'))
              }

              if (dayMaxPayAmountNumber < maxPayAmountNumber || dayMaxPayAmountNumber < minPayAmountNumber) {
                callback(this.$t('rules.dayMaxPayAmount'))
              }

              if (dayMaxPayAmountNumber < 1 || dayMaxPayAmountNumber > 100000000) {
                callback(this.$t('rules.dayMaxAmountLength2'))
              }
              callback()
            }
          }
        ],
        dayMaxCount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const singleDayCountStr = delcommafy(value)
              if (isNaN(parseInt(singleDayCountStr)) || !Regex.positiveInteger.test(singleDayCountStr)) {
                callback(this.$t('rules.count'))
              }

              if (parseInt(singleDayCountStr) < 1 || parseInt(singleDayCountStr) > 100000000) {
                callback(this.$t('rules.dayMaxCountLength2'))
              }

              callback()
            }
          }
        ],
        openTime: [
          {
            required: true,
            trigger: 'change',
            validator: this.validOpenTime
          },
          {
            required: true,
            trigger: 'blur',
            validator: this.validOpenTime
          }
        ],
        status: [...Rules.requiredChange],
        amount: [
          ...Rules.requiredBlur,
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              const amount = parseInt(value)

              if (isNaN(amount)) {
                callback(this.$t('rules.amount'))
              }

              if (amount > 1000000 || amount < 1) {
                callback(this.$t('rules.amountLength'))
              }

              callback()
            }
          }
        ],
        bankName: [...Rules.requiredChange],
        bankCode: [...Rules.requiredChange],
        roleName: [{ required: true, trigger: 'blur', message: this.$t('rules.required') }, ...Rules.roleName],
        payeeCardName: [...Rules.requiredBlur, ...Rules.payeeCardName],
        payeeCardNo: [...Rules.requiredBlur, ...Rules.cardNo2],
        memo: [...Rules.memo]
      },
      AccountStatusOptions,
      openTimeOption: {
        start: '00:00',
        step: '00:10',
        end: '24:00'
      },
      defaultFormData: {
        status: Status.Enabled,
        checkAllBanks: false, // 是否全選
        checkedBankCodes: [], // 已選到的
        isIndeterminate: false,
        serviceFeeType: '0',
        openStartTime: '00:00:00',
        openEndTime: '23:59:59',
        costRate: '0',
        costFixedAmount: '0.00',
        traceStatus: Status.Enabled
      },
      formData: {},
      list: [],
      merchantList: [],
      testedWithdrawChannel: undefined,
      testedFormData: {},
      bankListByVendor: [],
      privateKeyType: 'password',
      publicKeyType: 'password',
      thirdMerchantSignType: 'password',
      channelExtraType: 'password',
      privateKeyDisable: false,
      publicKeyDisable: false,
      thirdMerchantSignDisable: false,
      channelExtraDisable: false,
      vendorList: [],
      accountList: []
    }
  },
  created() {
    this.getBankOption()
    this.getAllWithdrawChannelCode()
    this.queryVendorList()
    this.queryAccountList()
  },
  mounted() {
    if (this.isSuperAdmin()) {
      this.queryMerchantList()
    }
  },
  methods: {
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
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList(true)
      }
    },
    handleServiceFeeType() {
      // 先不歸零
      // this.formData.costRate = '0'
      // this.formData.costFixedAmount = '0.00'
    },
    queryMerchantList() {
      getMerchantIndexingAll().then(response => {
        if (response) {
          this.merchantList = response.map(merchant => ({ id: merchant.merchantId, name: merchant.merchantName }))
        }
      })
    },
    isSuperAdmin() {
      return isSuperAdminLevel(this.$store)
    },
    queryAccountList() {
      getWithdrawChannelAllList().then(response => {
        this.accountList = response.map(({ accountId, accountName }) => {
          return {
            id: accountId,
            name: accountName
          }
        })
      })
    },
    // 金流商
    queryVendorList() {
      return getALLWithdrawVendorIndexing().then(response => {
        this.vendorList = response.map(({ vendorId, vendorName }) => {
          return {
            id: vendorId,
            name: vendorName
          }
        })
      })
    },
    resetKey(type) {
      this[`${type}Type`] = ''
      this.formData[type] = ''
      this[`${type}Disable`] = false
      this[`${type}Type`] = 'password'
    },
    // 切換公鑰私鑰顯示型態
    changePasswordType(type) {
      // 如果是額外配置
      if (type === 'channelExtraType') {
        if (this[type] === 'password') {
          this[type] = 'textarea'
        } else {
          this[type] = 'password'
        }
      } else {
        if (this[type] === 'password' || this[type] === 'textarea') {
          this[type] = ''
        } else {
          this[type] = 'password'
        }
      }
    },
    // 驗證渠道可用时段
    validOpenTime(rule, value, callback) {
      const openStartTime = this.formData.openStartTime
      const openEndTime = this.formData.openEndTime
      // const startTime = typeof openStartTime === 'string' ? openStartTime : moment(openStartTime).format('HH:mm:ss')
      // const endTime = typeof openEndTime === 'string' ? openEndTime : moment(openEndTime).format('HH:mm:ss')

      if (!openStartTime || !openEndTime) {
        callback(this.$t('rules.required'))
      } else if (!moment(openStartTime, 'HH:mm:ss').isBefore(moment(openEndTime, 'HH:mm:ss'))) {
        callback(this.$t('dateTimePicker.rules.range'))
      } else {
        callback()
      }
    },
    findBankListByVendor() {
      const { catchId } = this.formData
      // 從 catchId 尋找屬於他的銀行
      const checked = this.catchIdOptions.find(o => {
        return o.id === catchId
      })

      if (checked) {
        const {
          vendorId, balanceQueryUrl,
          orderOriginationUrl, orderQueryUrl,
          supportQueryBalance
        } = checked
        // 自動把 url 帶入
        this.formData.balanceQueryUrl = balanceQueryUrl
        this.formData.orderOriginationUrl = orderOriginationUrl
        this.formData.orderQueryUrl = orderQueryUrl
        //  判断是否要将輸入框反灰，并提示文字：上游不提供查询余额接口
        this.formData.supportQueryBalance = supportQueryBalance

        getBankListByVendor({ withdrawVendorId: vendorId }).then(res => {
          this.bankListByVendor = res
        })
      }
    },
    getAllWithdrawChannelCode() {
      getALLWithdrawVendorIndexing().then(res => {
        if (res) {
          this.catchIdOptions = res.map(
            ({ catchId, vendorName, vendorId, balanceQueryUrl,
              orderOriginationUrl, orderQueryUrl, supportQueryBalance
            }) => {
              return {
                id: catchId,
                name: vendorName,
                vendorId: vendorId,
                balanceQueryUrl,
                orderOriginationUrl,
                orderQueryUrl,
                supportQueryBalance // 判断是否要将輸入框反灰，并提示文字：上游不提供查询余额接口
              }
            }
          )
        }
      })
    },
    getBankOption() {
      getWithdrawBanks()
        .then(res => {
          if (res && res.length > 0) {
            this.bankList = res
          }
          this.getList()
        })
        .catch(() => {
          this.getList()
        })
    },
    inputMoney(el, row, name) {
      // singleDayCount 是要整數
      let intFormat = false
      if (name === 'dayMaxCount' || name === 'costRate') {
        intFormat = true
      }
      row[name] = getInputValue(el.target.value, intFormat ? 0 : 2)
    },
    getBankSelectionOption() {
      return this.bankList.map(o => {
        return { id: o.bankCode, name: `${o.bankCode}-${o.bankName}` }
      })
    },
    handleWithdrawSetting(row) {
      this.settingFormData = objectMerge(deepClone(this.defaultFormData), row)
      this.settingFormData.checkedBankCodes = row.useBankList.map(o => {
        return o.bankCode
      })
      this.settingFormData.isIndeterminate = true
      this.settingDialogFormVisible = true
      this.dialogType = 100 // 代付設定先直接
    },
    // 代付設定
    settingDialogFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.normailUseBankList()
          const { useBankList, accountId } = this.settingFormData
          const data = {
            useBankList,
            accountId
          }
          updateWithdrawChannel(data).then(() => {
            this.getList()
          })
          this.settingDialogFormVisible = false
        }
      })
    },
    getColBankName(bank) {
      return bank.map(o => o.bankName).join(',')
    },
    handleCheckAllBankChange(val) {
      let key = 'formData'
      if (this.dialogType === 100) {
        // 依照不同 dialog 選擇不同 formdata
        key = 'settingFormData'
      }
      // 選擇全部
      const allBank = this.bankList.map(o => o.bankCode)
      this[key].checkedBankCodes = val ? allBank : []
      this[key].isIndeterminate = false
    },
    handleCheckedBankChange(value) {
      // 單選銀行
      const checkedCount = value.length
      this.checkAll = checkedCount === this.bankList.length
      this.formData.isIndeterminate = checkedCount > 0 && checkedCount < this.bankList.length
    },
    hasAcl,
    getList(sorting = false) {
      if (!sorting) {
        delete this.paging.query.sort
        this.$refs.table.clearSort()
      }
      this.paging.isLoading = true
      getWithdrawChannelList(this.paging.query).then(response => {
        if (response && response.content) {
          response.content.forEach(res => {
            res.rateFixedAmount = moneyToDollar(res.rateFixedAmount)
            res.minAmount = moneyToDollar(res.minAmount)
            res.maxAmount = moneyToDollar(res.maxAmount)
            res.dayMaxAmount = moneyToDollar(res.dayMaxAmount)
            res.balance = moneyToDollar(res.balance)
            res.costFixedAmount = moneyToDollar(res.costFixedAmount)

            // 不需要
            // res.openStartTime = res.openStartTime.slice(0, -3)
            // res.openEndTime = res.openEndTime.slice(0, -3)

            if (res.withdrawChannelUrlList) {
              let found = res.withdrawChannelUrlList.find(url => url.type === WithdrawChannelUrlType.CreateOrder)
              if (found) {
                res.createOrderUrl = found.url
              }

              found = res.withdrawChannelUrlList.find(url => url.type === WithdrawChannelUrlType.GetOrder)
              if (found) {
                res.getOrderUrl = found.url
              }

              found = res.withdrawChannelUrlList.find(url => url.type === WithdrawChannelUrlType.GetBalance)
              if (found) {
                res.getBalanceUrl = found.url
              }
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
    changeStatus(row, { status, memo }) {
      const data = {
        accountId: row.accountId,
        catchId: row.catchId,
        status,
        action: 'STATUS',
        memo
      }
      updateWithdrawChannel(data).then(this.getList)
    },
    handleCreate() {
      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      // 預設全選
      this.formData.openDays = [0, 1, 2, 3, 4, 5, 6]
      // 清空
      this.bankListByVendor = []
      this.dialogType = DialogType.Create

      this.formData.openStartTime = '00:00:00'
      this.formData.openEndTime = '23:59:59'

      this.privateKeyType = 'password'
      this.publicKeyType = 'password'
      this.thirdMerchantSignType = 'password'
      this.channelExtraType = 'password'
      this.privateKeyDisable = false
      this.publicKeyDisable = false
      this.thirdMerchantSignDisable = false
      this.channelExtraDisable = false
    },
    handleModify(row) {
      const checked = this.catchIdOptions.find(o => {
        return o.id === row.catchId
      })

      if (checked) {
        const { vendorId } = checked
        getBankListByVendor({ withdrawVendorId: vendorId }).then(res => {
          this.bankListByVendor = res
        })
      }

      // 將 publicKey 與 privateKey 改為 disable
      this.publicKeyDisable = true
      this.privateKeyDisable = true
      this.thirdMerchantSignDisable = true
      this.channelExtraDisable = true

      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      // 設定可用星期
      this.formData.openDays = row.openDays.split(',').map(o => parseInt(o))
      // 代付手续費
      this.formData.serviceFeeType = String(row.serviceFeeType)
      // 銀行
      this.formData.checkedBankCodes = row.useBankList.map(o => {
        return o.bankCode
      })
      // 金額 format
      this.formData.minAmount = getInputValue(moneyToDollar(row.minAmount) * 100)
      this.formData.maxAmount = getInputValue(moneyToDollar(row.maxAmount) * 100)
      this.formData.dayMaxAmount = getInputValue(moneyToDollar(row.dayMaxAmount) * 100)
      this.formData.dayMaxCount = getInputValue(row.dayMaxCount, 0)
      this.formData.costRate = getInputValue(row.costRate, 0)
      this.formData.costFixedAmount = getInputValue(moneyToDollar(row.costFixedAmount) * 100)

      this.privateKeyType = 'password'
      this.publicKeyType = 'password'
      this.thirdMerchantSignType = 'password'
      this.channelExtraType = 'password'
      // 初始化時間，因為用不到年月日所以先隨意填寫
      // this.formData.openStartTime = new Date(2016, 9, 10, ...row.openStartTime.split(':'))
      // this.formData.openEndTime = new Date(2016, 9, 10, ...row.openEndTime.split(':'))

      this.dialogFormVisible = true
      this.dialogType = DialogType.Update
    },
    handleTestAccount(row) {
      this.testedFormData = {
        accountId: row.accountId
      }
      this.testedWithdrawChannel = row
      this.testDialogFormVisible = true
    },
    // handleRefresh(row) {
    //   const params = {
    //     accountId: row.accountId
    //   }
    //   refreshWithdrawChannel(params).then(response => {
    //     showSuccess()
    //     row.balance = moneyToDollar(response.balance)
    //   })
    // },
    handleRefresh(row) {
      const params = {
        accountId: row.accountId
      }
      refreshBalanceFromVendor(params).then(response => {
        showSuccess()
        const timer = buildTimer(row.accountId, 30000, this.$data.timers)
        timer.buildInstance()
        this.$data.timers.push(timer)
        row.preCatchBalance = moneyToDollar(response)
        row.balance = moneyToDollar(response)
      })
    },
    createData() {
      const validaKey = this.checkKey()
      this.$refs['dataForm'].validate(valid => {
        if (valid && validaKey) {
          this.normailServiceType()
          this.normailUseBankList()
          this.normalizeAmount()
          const data = this.normailDataForm()
          // this.normalizeOpenTime()
          addWithdrawChannel(data).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    checkKey() {
      // 判斷公、私、密鑰
      const { publicKey, privateKey, thirdMerchantSign } = this.formData
      // 不能全空
      if (str.isEmpty(publicKey) && str.isEmpty(privateKey) && str.isEmpty(thirdMerchantSign)) {
        return this.showErrorMessage(this.$t('withdrawChannelList.keyErr.allEmpty'))
      }
      // if (!publicKey && !thirdMerchantSign) {
      //   return this.showErrorMessage(this.$t('withdrawChannelList.keyErr.bothEmpty'))
      // }

      // if (!publicKey && privateKey) {
      //   return this.showErrorMessage(this.$t('withdrawChannelList.keyErr.publicKeyEmpty'))
      // }

      // if (publicKey && !privateKey) {
      //   return this.showErrorMessage(this.$t('withdrawChannelList.keyErr.privateKeyEmpty'))
      // }
      return true
    },
    showErrorMessage(message) {
      this.$message({
        message,
        type: 'error'
      })
      return false
    },
    updateData() {
      const validaKey = this.checkKey()
      this.$refs['dataForm'].validate(valid => {
        if (valid && validaKey) {
          this.normailServiceType()
          this.normailUseBankList()
          this.normalizeAmount()
          // this.normalizeOpenTime()
          const data = this.normailDataForm()
          data.action = 'INFO'
          data.accountId = this.formData.accountId
          updateWithdrawChannel(data).then(() => {
            this.getList()
          })
          this.dialogFormVisible = false
        }
      })
    },
    normailDataForm() {
      // 新增用到的 data
      const {
        accountName,
        catchId,
        channelMerchantId,
        channelMerchantName,
        publicKey,
        privateKey,
        thirdMerchantSign,
        orderOriginationUrl,
        orderQueryUrl,
        balanceQueryUrl,
        minAmount,
        maxAmount,
        dayMaxAmount,
        dayMaxCount,
        status,
        memo,
        openStartTime,
        openEndTime,
        openDays,
        useBankList,
        serviceFeeType,
        costRate,
        costFixedAmount,
        channelExtra,
        traceStatus
      } = this.formData
      return {
        traceStatus, // 追蹤狀態
        accountName,
        catchId,
        channelMerchantId,
        channelMerchantName,
        publicKey,
        privateKey,
        thirdMerchantSign,
        orderOriginationUrl,
        orderQueryUrl,
        balanceQueryUrl,
        minAmount,
        maxAmount,
        dayMaxAmount,
        dayMaxCount: parseInt(delcommafy(dayMaxCount)),
        status,
        memo: str.isEmpty(memo) ? '' : memo,
        openStartTime,
        openEndTime,
        // openStartTime: typeof openStartTime === 'string' ? openStartTime : moment(openStartTime).format('HH:mm:ss'),
        // openEndTime: typeof openEndTime === 'string' ? openEndTime : moment(openEndTime).format('HH:mm:ss'),
        useBankList,
        // serviceFeeType: serviceFeeType ? 0 : serviceFeeType, // 此欄位已經移除，default 0
        serviceFeeType,
        openDays: openDays.join(','),
        costFixedAmount, // 此欄位已經移除，為了讓db 可以過，defualt 0
        costRate, // 此欄位已經移除，為了讓db 可以過，defualt 0
        channelExtra
      }
    },
    normailServiceType() {
      const { serviceFeeType } = this.formData
      this.formData.serviceFeeType = parseInt(serviceFeeType)
    },
    normailUseBankList() {
      // 已有勾選的
      let key = 'formData'
      if (this.dialogType === 100) {
        // 依照不同 dialog 選擇不同 formdata
        key = 'settingFormData'
      }
      const { checkedBankCodes } = this[key]
      this[key].useBankList = checkedBankCodes
    },
    normalizeAmount() {
      this.formData.rateFixedAmount = moneyToCent(delcommafy(this.formData.rateFixedAmount))
      this.formData.minAmount = moneyToCent(delcommafy(this.formData.minAmount))
      this.formData.maxAmount = moneyToCent(delcommafy(this.formData.maxAmount))
      this.formData.dayMaxAmount = moneyToCent(delcommafy(this.formData.dayMaxAmount))
      this.formData.costFixedAmount = moneyToCent(delcommafy(this.formData.costFixedAmount))
    },
    normalizeOpenTime() {
      if (this.formData.openStartTime === '24:00') {
        this.formData.openStartTime = '23:59'
      }
      this.formData.openStartTime += ':00'

      if (this.formData.openEndTime === '24:00') {
        this.formData.openEndTime = '23:59'
      }
      this.formData.openEndTime += ':59'
    },
    testWithdrawChannel() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.testedFormData.amount = moneyToCent(this.testedFormData.amount)
          const checkBank = this.bankList.filter(o => o.bankCode === this.testedFormData.bankCode)
          if (checkBank && checkBank.length > 0) {
            this.testedFormData.bankName = checkBank[0].bankName
          }
          testWithdrawChannel(this.testedFormData).then(response => {
            this.$alert(
              this.$t('accountList.testAccountContent'),
              this.$t('accountList.testAccountTitle') + response.withdrawOrderId
            )
          })
          this.testDialogFormVisible = false
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-checkbox {
  width: 30%;
}

.el-checkbox+.el-checkbox {
  margin: 0;
}

.show-pwd {
  cursor: pointer;
  margin: 0 5px;
}
</style>

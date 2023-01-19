<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="filter-container">
        <!-- <bs-add-button @click="handleCreate" /> -->
        <el-button size='mini' type='danger' @click='handleLogin(false)'>
          {{ $t("userList.inhibitLogin") }}
        </el-button>
        <el-button size='mini' type='success' @click='handleLogin(true)'
          v-permission="[Permission.MEMBER_MANAGER_LOGIN_BATCH]">
          {{ $t("userList.allowLogin") }}
        </el-button>
        <el-button size='mini' type='danger' @click='handleGroup(false, 1)'>
          {{ $t("userList.inhibitCreateGroup") }}
        </el-button>
        <el-button size='mini' type='success' @click='handleGroup(true, 1)'
          v-permission="[Permission.MEMBER_MANAGER_ALLOW_GROUP]">
          {{ $t("userList.allowCreateGroup") }}
        </el-button>
        <el-button size='mini' type='success' @click='handleGroup(true, 2)'
          v-permission="[Permission.MEMBER_MANAGER_ALLOW_GROUP_BATCH]">
          {{ $t("userList.allowAdminCreateGroup") }}
        </el-button>
      </div>
      <div class="filter-container">
        <bs-input v-model="paging.query.phone" :placeholder="$t('userList.mobile')" />
        <bs-input v-model="paging.query.memberName" :placeholder="$t('userList.account')" />
        <bs-input v-model="paging.query.nickName" :placeholder="$t('userList.nickname')" filterable />
        <bs-input v-model="paging.query.inviteCode" :placeholder="$t('inviteCode.inviteCode')" />
        <bs-input v-model="paging.query.registerIp" :placeholder="$t('userList.registrationIP')" />
        <bs-select v-model="paging.query.loginEnable" :options="RuleStatusOptions"
          :placeholder="$t('userList.status')" />
        <bs-select v-model="paging.query.addFriendEnable" :options="RuleStatusOptions"
          :placeholder="$t('userList.addFriends')" />
        <bs-select v-model="paging.query.createGroupEnable" :options="RuleStatusOptions"
          :placeholder="$t('userList.permission')" />
        <bs-select v-model="paging.query.accountType" :options="AccountTypeOptions"
          :placeholder="$t('userList.admin')" />
        <bs-date-range-picker type="datetimerange" v-model="paging.query.dates" :clearable="true"
          :placeholder="$t('userList.registration')" style="margin-bottom: 10px; vertical-align: middle;" />
        <bs-search-button @click="handleSearch" v-permission="[Permission.MEMBER_PAGE]" />
        <bs-button :title="$t('userList.addUser')" @click="handleCreate" v-permission="[Permission.MEMBER_INSERT]" />
        <!-- 暫時隱藏 -->
        <!-- <bs-button :title="$t('userList.batchAddUser')" @click="addBatch" v-permission="[Permission.MEMBER_INSERT_BATCH]"/> -->
      </div>

      <el-table :data="list" v-loading="paging.isLoading" :element-loading-text="$t('table.loading')" border fit
        highlight-current-row style="width: 100%" @sort-change="onSortChange" v-permission="[Permission.MEMBER_LIST]">
        <el-table-column :label="$t('userList.userInfo')" min-width="250px" fixed="left">
          <template slot-scope="scope">
            <div class="flex_container">
              <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                :preview-src-list="[avatar]" />
              <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                :preview-src-list="[scope.row.avatarUrl]" />
              <div class="rightbox">
                <span>{{ $t('userList.nickname') + '：' + scope.row.nickName }}</span>
                <span>{{ $t('userList.username') + '：' + scope.row.memberName }}</span>
                <span>{{ $t('userList.mobile') + '：' + scope.row.phone }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.source')" min-width="160px">
          <template slot-scope="scope">
            <div class="rightbox">
              <div class="inbox">
                <span>{{ $t('inviteCode.inviteCode') + ':' }}</span>
                <span>{{ scope.row.inviteCode }}</span>
              </div>
              <div class="inbox">
                <span>{{ $t('userList.channel') + ':' }}</span>
                <span>{{ scope.row.channel }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.time')" min-width="280px">
          <template slot-scope="scope">
            <div class="rightbox">
              <div class="inbox">
                <span style="width: 90px">{{ $t('userList.createTime') + ':' }}</span>
                <span style="width: 150px">{{ scope.row.createTime | moment }}</span>
              </div>
              <div class="inbox">
                <span style="width: 90px">{{ $t('userList.updateTime') + ':' }}</span>
                <span style="width: 150px">{{ scope.row.updateTime | moment }}</span>
              </div>
              <span>{{ $t('userList.loginErrorCount') + '：' + scope.row.loginErrorCount }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.fromIpAndAddress')" min-width="280px">
          <template slot-scope="scope">
            <div class="rightbox">
              <div class="inbox">
                <span>{{ $t('userList.registrationIP') + '：' + scope.row.registerIp }}</span>
                <span style="cursor:pointer; margin-left:10px; color:#409EFF" @click='handleCheckedIp(scope.row)'>
                  {{ $t('userList.checkedIp') }}
                </span>
              </div>
              <span>{{ $t('userList.fromIp') + '：' + scope.row.registerArea }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.wallet')" width="150px">
          <template slot-scope="scope">
            <div class="inbox">
              <span>{{ $t('userList.totalBalance') }}: {{ Number(scope.row.balance || 0) | money }}</span>
              <span style="cursor:pointer; color:#409EFF" @click='handleWithdraw(scope.row)'>
                {{ $t('userList.withdraw') }}
              </span>
            </div>
            <div class="inbox">
              <span>{{ $t('userList.freeze') }}: {{ scope.row.freeze | money }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.login')">
          <template slot-scope="scope">
            <bs-switch v-model="scope.row.loginEnable" @change="changeLoginEnableRealTime(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.addFriends')">
          <template slot-scope="scope">
            <bs-switch v-model="scope.row.addFriendEnable" @change="changeFriendEnableRealTime(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.createGroup')">
          <template slot-scope="scope">
            <bs-switch v-model="scope.row.createGroupEnable" @change="changeGroupEnableRealTime(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('userList.admin')">
          <template slot-scope="scope">
            <bs-tag :options="AccountTypeOptions" :status="scope.row.accountType" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('table.actions')" min-width="130%" fixed="right">
          <template slot-scope="scope">
            <el-dropdown @command="(command) => { handleCommand(command, scope.row) }">
              <span class="el-dropdown-link">{{ $t('dropdown.more') }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1" v-permission="[Permission.MEMBER_CHAT_MEMBER]">
                  {{ $t('userList.friendsAndChatHistory') }}
                </el-dropdown-item>
                <el-dropdown-item command="2" v-permission="[Permission.MEMBER_DETAIL]">
                  {{ $t('userList.log') }}
                </el-dropdown-item>
                <el-dropdown-item command="3" v-permission="[Permission.MEMBER_EDIT]">
                  {{ $t('table.edit') }}
                </el-dropdown-item>
                <el-dropdown-item command="4" v-permission="[Permission.MEMBER_SENT_MESSAGE]">
                  {{ $t('userList.sendMessage') }}
                </el-dropdown-item>
                <el-dropdown-item command="5" v-permission="[Permission.MEMBER_CLEAN_LOGIN_ERROR]">
                  {{ $t('userList.clearLogErrors') }}
                </el-dropdown-item>
                <!-- 暫時隱藏 -->
                <!-- <el-dropdown-item command="6">{{$t('table.delete')}}</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <bs-pagination :current-page="paging.query.page" :page-size="paging.query.rows" :total="paging.totalElements"
        @on-change-page="handleCurrentChange" @on-change-page-size="handleSizeChange" />

      <!-- 添加用户-弹跳视窗 -->
      <el-dialog :title="$t('userList.addUser')" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
        :close-on-click-modal="false" :show-close="true" width="50%">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('userList.nickname')" prop="nickName">
            <bs-input v-model="formData.nickName" :placeholder='$t("userList.systemDefaultValue")' />
          </el-form-item>
          <el-form-item :label="$t('userList.avatar')">
            <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
              <img v-if="!imageData" :src="avatar" class="placeholder" />
              <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
            </div>
          </el-form-item>
          <el-form-item :label="$t('userList.password')" prop="password">
            <bs-input type="password" v-model="formData.password" />
          </el-form-item>
          <el-form-item :label="$t('userList.mobile')" prop="phone">
            <bs-input v-model="formData.phone" />
          </el-form-item>
          <el-form-item :label="$t('userList.email')" prop="email">
            <bs-input v-model="formData.email" />
          </el-form-item>
          <el-form-item :label='$t("userList.gender")' prop='gender'>
            <el-radio v-model='formData.gender' :label='GenderType.Secret'>
              {{ $t("userList.secret") }}
            </el-radio>
            <el-radio v-model='formData.gender' :label='GenderType.Man'>
              {{ $t("userList.man") }}
            </el-radio>
            <el-radio v-model='formData.gender' :label='GenderType.Woman'>
              {{ $t("userList.woman") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="dialogFormVisible = false" />
          <bs-submit-button @click="createData" v-permission="[Permission.MEMBER_REGISTER_IM_MEMBER]" />
        </div>
      </el-dialog>

      <!-- 用户详情-弹跳视窗 -->
      <el-dialog :title="$t('userList.userDetail')" :visible.sync="editDialogFormVisible" v-if="editDialogFormVisible"
        :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('userList.nickname')" prop="nickName">
            <bs-input v-model="formData.nickName" />
          </el-form-item>
          <el-form-item :label="$t('userList.avatar')">
            <div class="base-image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
              <img v-if="!imageData" :src="avatar" class="placeholder" />
              <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
            </div>
          </el-form-item>
          <el-form-item :label="$t('userList.username')" prop="username">
            <bs-input v-model="formData.memberName" :disabled='true' />
          </el-form-item>
          <el-form-item :label="$t('userList.editPassword')" prop="password">
            <bs-input type="password" v-model="formData.password" :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('userList.withdrawPassword')" prop="tradePwd">
            <bs-input type="password" v-model="formData.tradePwd" :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
          <el-form-item :label="$t('userList.mobile')" prop="phone">
            <bs-input v-model="formData.phone" :disabled='true' />
          </el-form-item>
          <el-form-item :label="$t('userList.email')" prop="email">
            <bs-input v-model="formData.email" />
          </el-form-item>
          <el-form-item :label='$t("userList.gender")' prop='gender'>
            <el-radio v-model='formData.gender' :label='GenderType.Secret'>
              {{ $t("userList.secret") }}
            </el-radio>
            <el-radio v-model='formData.gender' :label='GenderType.Man'>
              {{ $t("userList.man") }}
            </el-radio>
            <el-radio v-model='formData.gender' :label='GenderType.Woman'>
              {{ $t("userList.woman") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-text-area v-model="formData.memo" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="editDialogFormVisible = false" />
          <bs-submit-button @click="updateData" />
        </div>
      </el-dialog>

      <!-- 查看聊天记录-弹跳视窗 -->
      <el-dialog :title='$t("table.detail") + $t("userList.chatHistory")' :visible.sync='chatHistoryDialogFormVisible'
        v-if='chatHistoryDialogFormVisible' width='100%'>
        <div class="filter-container">
          <bs-input v-model="dialogPaging.query.phone" :placeholder="$t('userList.mobile')" />
          <bs-input v-model="dialogPaging.query.memberName" :placeholder="$t('userList.account')" />
          <bs-input v-model="dialogPaging.query.nickName" :placeholder="$t('userList.nickname')" filterable />
          <bs-search-button @click="getChatHistoryList" />
          <bs-button :title="$t('userList.addFriends')" @click="handleAddFriend"
            v-permission="[Permission.MEMBER_INSERT_FRIEND]" />
          <bs-button :title="$t('userList.adminChatHistory')" @click="handleAdminChatHistory" />
        </div>
        <div class='filter-container'>
          <el-table :data='historyList' v-loading='paging.isLoading' :element-loading-text='$t("table.loading")' border
            fit highlight-current-row style="width: 100%">
            <el-table-column :label='$t("userList.avatar")' min-width='30%'>
              <template slot-scope='scope'>
                <el-image class="avatar" v-if="!scope.row.avatarUrl" :src="avatar" fit="contain"
                  :preview-src-list="[avatar]" />
                <el-image class="avatar" v-else :src="scope.row.avatarUrl" fit="contain"
                  :preview-src-list="[scope.row.avatarUrl]" />
              </template>
            </el-table-column>
            <el-table-column :label='$t("userList.mobile")'>
              <template slot-scope='scope'>{{ scope.row.phone }}</template>
            </el-table-column>
            <el-table-column :label='$t("userList.account")'>
              <template slot-scope='scope'>{{ scope.row.memberName }}</template>
            </el-table-column>
            <el-table-column :label='$t("userList.nickname")'>
              <template slot-scope='scope'>{{ scope.row.nickName }}</template>
            </el-table-column>
            <el-table-column :label='$t("userList.gender")' min-width='30%'>
              <template slot-scope='scope'>
                <bs-tag :options="GenderOptions" :status="scope.row.gender" />
              </template>
            </el-table-column>
            <el-table-column :label='$t("userList.addFriendsTime")'>
              <template slot-scope='scope'>{{ scope.row.addTime | moment }}</template>
            </el-table-column>
            <el-table-column :label='$t("userList.blacked")'>
              <template slot-scope='scope'>
                <bs-tag :options="BlackedOptions" :status="scope.row.blacked" />
              </template>
            </el-table-column>
            <el-table-column :label='$t("userList.chatHistory")'>
              <template slot-scope='scope'>
                <el-button size='mini' type='primary' class='filter-item remove-m-l'
                  @click='handleChatDetail(scope.row)'>
                  {{ $t("table.detail") }}
                </el-button>
                <el-button size='mini' type='primary' class='filter-item remove-m-l'
                  @click='handleClearHistory(scope.row)' v-permission="[Permission.MEMBER_CLEAN_CHAT]">
                  {{ $t("userList.clearHistory") }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column :label='$t("table.actions")'>
              <template slot-scope='scope'>
                <el-button size='mini' class='filter-item remove-m-l' type='danger'
                  @click='handleDeleteFriend(scope.row)' v-permission="[Permission.MEMBER_DELETE_FRIEND]">
                  {{ $t("userList.deleteFriend") }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-pagination @current-change="handleHistoryCurrentChange" :current-page="dialogPaging.query.page"
          :page-size="20" layout="total, prev, pager, next, jumper" :total="dialogPaging.totalElements">
        </el-pagination>
      </el-dialog>

      <!-- 添加好友-弹跳视窗 -->
      <el-dialog :title="$t('userList.addFriends')" :visible.sync="addFriendsDialogFormVisible"
        v-if="addFriendsDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label="$t('userList.mobile') + '/' + $t('userList.account')" prop="member" label-width="150px">
            <bs-input v-model="formData.member" :placeholder="$t('userList.passwordPlaceholder')" />
          </el-form-item>
          <el-form-item :label='$t("userList.noChecked")' label-width="130px" prop="verify">
            <el-radio v-model='formData.verify' label='2'>
              {{ $t("userList.pass") }}
            </el-radio>
            <el-radio v-model='formData.verify' label='1'>
              {{ $t("userList.needChecked") }}
            </el-radio>
            <div>
              <span style="color: #8c939d">{{ $t('userList.addFriendsDescription') }}</span>
            </div>
          </el-form-item>
          <el-form-item :label="$t('userList.checkedMessage')" prop="verifyText" label-width="130px"
            v-if="formData.verify === '1'">
            <bs-input v-model="formData.verifyText" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="addFriendsDialogFormVisible = false" />
          <bs-button :title="$t('userList.addFriends')" @click="addFriends" />
        </div>
      </el-dialog>

      <!-- 清空聊天记录-弹跳视窗 -->
      <el-dialog :title="$t('userList.clearHistory')" :visible.sync="clearHistoryDialogFormVisible"
        v-if="clearHistoryDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label='$t("userList.clearCount")' label-width="150px" prop="verify">
            <el-radio v-model='formData.type' label='1'>
              {{ $t("userList.clearAll") }}
            </el-radio>
            <el-radio v-model='formData.type' label='2'>
              {{ $t("userList.clear100") }}
            </el-radio>
            <el-radio v-model='formData.type' label='3'>
              {{ $t("userList.custom") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('userList.retractMessage')" prop="count" label-width="170px"
            v-if="formData.type === '3'">
            <el-input v-model="formData.count" size="mini" oninput="value = value.match(/[^0-9]/g)[0]"
              @keyup.native="number_change($event)" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="clearHistoryDialogFormVisible = false" />
          <bs-button :title="$t('userList.clean')" @click="clearChatHistory" />
        </div>
      </el-dialog>

      <!-- 操作确认-弹跳视窗 -->
      <el-dialog :visible.sync="operationDialogVisible" v-if="operationDialogVisible" :title="operationTitle"
        width="30%" center :close-on-click-modal="false" :show-close="true">
        <span>{{ operationText }}</span>
        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="operationDialogVisible = false" />
          <bs-button :title="$t('table.confirm')" @click="confirm" />
        </div>
      </el-dialog>

      <!-- 发送消息-弹跳视窗 -->
      <el-dialog :title="$t('userList.sendMessage')" :visible.sync="sendMessageDialogFormVisible"
        v-if="sendMessageDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="top" label-width="0px">
          <el-form-item prop="content" label-width="150px">
            <el-input style="width: 100%;" v-model="formData.content" :placeholder="$t('userList.enterMessage')"
              label-width="auto" />
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-button :title="$t('userList.send')" @click="sendMessage" />
        </div>
      </el-dialog>

      <!-- 提存-弹跳视窗 -->
      <el-dialog :title="$t('userList.withdraw')" :visible.sync="withdrawDialogFormVisible"
        v-if="withdrawDialogFormVisible" :close-on-click-modal="false" :show-close="true">
        <el-form :rules="rules" ref="dataForm" :model="formData" label-position="left" label-width="100px">
          <el-form-item :label='$t("userList.type")' prop='type'>
            <el-radio v-model='formData.type' label='1'>
              {{ $t("userList.recharge") }}</el-radio>
            <el-radio v-model='formData.type' label='2'>
              {{ $t("userList.manualWithdraw") }}
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('userList.amountDesc')" prop="amount">
            <div class="input-row">
              <el-input v-model="formData.amount" size="mini" oninput="value = value.match(/[^0-9]/g)[0]"
                @keyup.native="number_change($event)" />
              <!-- 手動提取顯示最大可提領金額 -->
              <span v-if="formData.type === '2'">
                MAX: {{ Number(formData.balance | 0) - Number(formData.freeze | 0) | money }}
              </span>
            </div>
          </el-form-item>
          <!-- 暫時隱藏 -->
          <!-- <el-form-item :label="$t('table.memo')" prop="memo">
            <bs-input v-model="formData.memo" />
          </el-form-item> -->
        </el-form>

        <div slot="footer" class="dialog-footer">
          <bs-cancel-button @click="withdrawDialogFormVisible = false" />
          <bs-button :title="$t('table.confirm')" @click="withdraw" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard'
import { DialogTypeOptions, StatusOptions, UserLevelOptions, RuleStatusOptions, AccountTypeOptions, BlackedOptions, GenderOptions } from '@/definitions/options'
import { DialogType, Permission, UserLevel, RechargeWithdrawType, ClearHistoryType, GenderType } from '@/definitions/constants'
import { deepClone, objectMerge } from '@/utils'
import { Rules, Regex } from '@/definitions/fieldCheck'
import {
  getUserList,
  cleanLoginError,
  blockManagerLogin,
  blockCreateGroup,
  sendMessage,
  addFriend,
  getChatHistoryList,
  clearChatHistory,
  deleteFriend,
  addMember,
  updateMember
} from '@/api/member'
import { manualRechargeWithdraw } from '@/api/manual'
import avatar from '@/assets/user/avatar.png'
import { checkNum } from '@/utils/validate'
import { formatDate } from '@/utils/format'
import { hasAcl } from '@/utils/auth'
import sha256 from 'crypto-js/sha256'

export default {
  name: 'userList',
  directives: {
    clipboard
  },
  data() {
    return {
      avatar,
      Permission,
      UserLevelOptions,
      RuleStatusOptions,
      AccountTypeOptions,
      BlackedOptions,
      GenderOptions,
      dialogFormVisible: false,
      editDialogFormVisible: false,
      sendMessageDialogFormVisible: false,
      addFriendsDialogFormVisible: false,
      chatHistoryDialogFormVisible: false,
      clearHistoryDialogFormVisible: false,
      operationDialogVisible: false,
      withdrawDialogFormVisible: false,
      resetOtpForm: {},
      DialogType,
      GenderType,
      dialogType: 0,
      DialogTypeOptions,
      paging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 0,
          rows: 20,
          needSort: true,
          id: this.$route.query.id,
          inviteCode: this.$route.query.inviteCode,
          memberName: this.$route.query.memberName
        }
      },
      historyPage: 0,
      dialogPaging: {
        isLoading: false,
        totalElements: null,
        query: {
          page: 1,
          rows: 20,
          needSort: true
        }
      },
      rules: {
        nickName: [
          ...Rules.nickname,
          { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLengthWords') }
        ],
        status: [...Rules.requiredChange],
        memo: [...Rules.memo],
        password: [
          ...Rules.noSpace,
          { trigger: 'blur', pattern: Regex.passwordV2, message: this.$t('rules.onlyEnAndNum') },
          { trigger: 'blur', min: 4, max: 20, message: this.$t('rules.fourToTwentyLengthWords') }
        ],
        tradePwd: [
          ...Rules.noSpace,
          { trigger: 'blur', pattern: Regex.passwordV2, message: this.$t('rules.onlyEnAndNum') },
          { trigger: 'blur', min: 4, max: 20, message: this.$t('rules.fourToTwentyLengthWords') }
        ],
        verifyText: [
          ...Rules.requiredBlur, ...Rules.noSpace,
          { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLengthWords') }
        ],
        email: [...Rules.email],
        phone: [...Rules.requiredBlur, ...Rules.noSpace, ...Rules.mobile],
        gender: [...Rules.requiredBlur],
        verify: [...Rules.requiredBlur],
        type: [...Rules.requiredBlur],
        content: [...Rules.requiredBlur],
        count: [...Rules.requiredBlur, ...Rules.cardNo],
        amount: [
          { required: true, validator: this.ruleNumberCheck, trigger: 'blur' },
          { required: true, validator: this.ruleNumberCheck, trigger: 'change' }
        ],
        member: [...Rules.requiredBlur]
      },
      StatusOptions,
      defaultFormData: {
        gender: GenderType.Secret,
        type: '1',
        codeType: '1',
        verify: '2'
      },
      imageData: null,
      formData: {},
      memberData: {},
      list: [],
      historyList: [],
      operationKey: '',
      operationTitle: undefined,
      operationText: undefined,
      merchantList: [],
      searchDates: [],
      isSuperAdmin: this.$store.getters.user.level === UserLevel.SuperAdmin,
      isShowRoleOption: false // 只有第一次進來的時候
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 10) {
        return value.slice(0, 6) + '...' + value.slice(-6)
      }

      return value
    }
  },
  created() {
  },
  mounted() {
    this.paging.isLoading = true
    this.handleSearch()
  },
  methods: {
    // 改變 switch 狀態
    changeFriendEnableRealTime(row) {
      this.formData = row
      if (this.imageData) this.imageData = null // 不用傳avatarUrl，清除 imageData
      if (row.addFriendEnable > 0) this.formData.addFriendEnable = false
      else this.formData.addFriendEnable = true
      updateMember(this.serializeFormData(this.formData)).then(this.getList)
    },
    changeGroupEnableRealTime(row) {
      this.formData = row
      if (this.imageData) this.imageData = null // 不用傳avatarUrl，清除 imageData
      if (row.createGroupEnable > 0) this.formData.createGroupEnable = false
      else this.formData.createGroupEnable = true
      updateMember(this.serializeFormData(this.formData)).then(this.getList)
    },
    changeLoginEnableRealTime(row) {
      this.formData = row
      if (this.imageData) this.imageData = null // 不用傳avatarUrl，清除 imageData
      if (row.loginEnable > 0) this.formData.loginEnable = false
      else this.formData.loginEnable = true
      updateMember(this.serializeFormData(this.formData)).then(this.getList)
    },
    changeAdminEnableRealTime(row) {
      this.formData = row
      if (this.imageData) this.imageData = null // 不用傳avatarUrl，清除 imageData
      if (row.adminEnable > 0) this.formData.adminEnable = false
      else this.formData.adminEnable = true
      updateMember(this.serializeFormData(this.formData)).then(this.getList)
    },
    handleCommand(command, row) {
      switch (command) {
        case '1':
          this.handleChatHistory(row) // 好友/聊天记录
          break
        case '2':
          this.handleUserLog(row) // 日志
          break
        case '3':
          this.handleModify(row) // 編輯
          break
        case '4':
          this.handleSendMessage(row) // 发送消息
          break
        case '5':
          this.handleClearLoginError(row) // 清除登录错误次数
          break
        case '6':
          this.handleDeleteUser(row) // 刪除
          break

        default:
          break
      }
    },
    handleChatHistory(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.memberData = deepClone(row) // 聊天記錄列表使用
      this.chatHistoryDialogFormVisible = true
      this.getChatHistoryList()
    },
    handleUserLog(row) {
      this.$router.push({
        path: '/user/memberOperateLog',
        query: { memberName: row.memberName }
      })
    },
    handleAdminChatHistory() {
      this.$router.push({
        path: '/message/messageList',
        query: { account1: this.memberData.memberName, account2: '' }
      })
    },
    handleSendMessage(row) {
      this.formData = deepClone(row)
      this.sendMessageDialogFormVisible = true
    },
    handleDeleteUser(row) {
      this.formData = deepClone(row)

      this.operationDialogVisible = true
      this.operationTitle = this.$t('userList.operationTitle')
      this.operationText = this.$t('userList.deleteUserDesc')
      this.operationKey = 'deleteuser'
    },
    handleClearLoginError(row) {
      this.formData = deepClone(row)

      this.operationDialogVisible = true
      this.operationTitle = this.$t('userList.operationTitle')
      this.operationText = this.$t('userList.clearLoginErrorDesc')
      this.operationKey = 'clearerror'
    },
    handleModify(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.imageData = row.avatarUrl
      this.formData.gender = row.gender ? row.gender.toString() : '1'
      this.editDialogFormVisible = true

      this.rules.password = [
        ...Rules.noSpace,
        { trigger: 'blur', pattern: Regex.passwordV2, message: this.$t('rules.onlyEnAndNum') },
        { trigger: 'blur', min: 4, max: 20, message: this.$t('rules.fourToTwentyLengthWords') }
      ]

      this.rules.nickName = [
        ...Rules.requiredBlur, ...Rules.nickname,
        { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLengthWords') }
      ]
    },
    confirm() {
      this.operationDialogVisible = false
      let data = {}
      if (this.operationKey === 'deleteuser') {
        // deleteUser(data).then(this.getList)
      } else if (this.operationKey === 'clearerror') {
        data = {
          id: this.formData.id
        }
        cleanLoginError(data).then(this.getList)
      } else if (this.operationKey === 'login') {
        data = {
          isBlock: this.formData.isBlock
        }
        blockManagerLogin(data).then(this.getList)
      } else if (this.operationKey === 'group') {
        data = {
          isBlock: this.formData.isBlock,
          accountType: this.formData.accountType
        }
        blockCreateGroup(data).then(this.getList)
      } else if (this.operationKey === 'deleteFriend') {
        deleteFriend(this.formData.id).then(this.getChatHistoryList)
      }
    },
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        // 選完圖片預覽用
        const reader = new FileReader()
        reader.onload = e => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
      }
    },
    handleLogin(isBlock) {
      this.operationDialogVisible = true
      this.operationTitle = this.$t('userList.operationTitle')
      this.formData.isBlock = isBlock
      this.operationKey = 'login'
      if (isBlock) {
        this.operationText = this.$t('userList.allowLoginText')
      } else {
        this.operationText = this.$t('userList.inhibitLoginText')
      }
    },
    handleGroup(isBlock, accountType) {
      this.operationDialogVisible = true
      this.operationTitle = this.$t('userList.operationTitle')
      this.operationText = this.$t('userList.clearLoginErrorDesc')
      this.operationKey = 'group'
      this.formData.isBlock = isBlock
      this.formData.accountType = accountType
      if (isBlock) {
        if (accountType === 2) {
          this.operationText = this.$t('userList.allowAdminCreateGroupText')
        } else {
          this.operationText = this.$t('userList.allowCreateGroupText')
        }
      } else {
        this.operationText = this.$t('userList.inhibitCreateGroupText')
      }
    },
    serializeFormData(data) {
      const {
        nickName,
        gender,
        phone,
        email,
        password,
        tradePwd,
        id,
        addFriendEnable,
        createGroupEnable,
        loginEnable,
        adminEnable,
        memo
      } = data
      const formData = new FormData()
      // 有更新圖片
      if (this.imageData) {
        if (this.imageData.indexOf('http://') === 0 || this.imageData.indexOf('https://') === 0) {
          // 如果有 http or https 不用傳資料
        } else {
          formData.append('avatarFile', this.$refs.fileInput.files[0])
        }
      }
      if (phone) {
        formData.append('phone', phone)
      }
      if (email) {
        formData.append('email', email)
      }
      if (password) {
        formData.append('password', sha256(password).toString())
      }
      if (nickName) {
        formData.append('nickName', nickName)
      }
      if (tradePwd) {
        formData.append('tradePwd', sha256(tradePwd).toString())
      }
      if (!gender) {
        formData.append('gender', 1) // default 保留
      } else {
        formData.append('gender', gender)
      }
      if (memo) {
        formData.append('memo', memo)
      }
      if (id) {
        formData.append('id', id)
      }
      formData.append('addFriendEnable', addFriendEnable)
      formData.append('accountType', adminEnable ? 2 : 1)
      formData.append('createGroupEnable', createGroupEnable)
      formData.append('loginEnable', loginEnable)

      return formData
    },
    handleWithdraw(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.formData.userId = row.id
      this.withdrawDialogFormVisible = true
    },
    withdraw() {
      // 輸入的提領金額
      const amount = Number(this.formData.amount | 0)
      // 總餘額
      const total = Number(this.formData.balance | 0)
      // 凍結金額
      const freeze = Number(this.formData.freeze | 0)
      // 實際可提領金額
      const minus = total - freeze

      if (amount === 0) {
        this.$message({
          message: this.$t('rules.count'),
          type: 'error'
        })
        return
      }

      if (minus < amount && Number(this.formData.type) === RechargeWithdrawType.Withdraw) {
        this.$message({
          message: this.$t('userList.noBalance'),
          type: 'error'
        })
        return
      }
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { type, amount, userId } = this.formData
          const data = {
            userId: userId,
            type: Number(type),
            amount: Number(amount)
          }
          manualRechargeWithdraw(data).then(() => {
            this.getList()
            this.withdrawDialogFormVisible = false
          })
        }
      })
    },
    handleAddFriend() {
      this.formData = deepClone(this.defaultFormData)
      this.addFriendsDialogFormVisible = true
    },
    addFriends() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const { verify, member, verifyText } = this.formData
          const data = {
            id: this.memberData.id,
            member: member,
            verify: Number(verify),
            verifyText: verifyText
          }

          addFriend(data).then(() => {
            this.getChatHistoryList()
            this.addFriendsDialogFormVisible = false
          })
        }
      })
    },
    handleCheckedIp(row) {
      const href = 'https://www.ip.cn?ip=' + row.registerIp
      window.open(href, '_blank')
    },
    handleSearch() {
      this.paging.query.page = 0
      this.getList()
    },
    getQueryParams() {
      const params = { ...this.paging.query, page: this.paging.query.page + 1 }
      const { dates } = params
      // 日期參數重整
      if (dates) {
        params.createTimeGt = formatDate(this.paging.query.dates[0])
        params.createTimeLe = formatDate(this.paging.query.dates[1])
        params.dates = undefined
      }
      return params
    },
    getList() {
      if (!hasAcl(Permission.MEMBER_PAGE)) return
      this.paging.isLoading = true
      getUserList(this.getQueryParams()).then(response => {
        this.list = response.page.map(res => ({
          ...res,
          loginEnable: res.loginEnable ? 1 : 0,
          addFriendEnable: res.addFriendEnable ? 1 : 0,
          createGroupEnable: res.createGroupEnable ? 1 : 0,
          adminEnable: res.accountType === 2 ? 1 : 0,
          loginErrorCount: res.loginErrorCount === null ? this.$t('userList.notRegistration') : res.loginErrorCount
        }))
        this.paging.totalElements = response.total
        this.paging.isLoading = false
      })
    },
    getQueryDialogParams() {
      const params = { ...this.dialogPaging.query, page: this.dialogPaging.query.page }
      return params
    },
    // 取得聊天記錄列表
    getChatHistoryList() {
      this.dialogPaging.isLoading = true
      this.dialogPaging.query.id = this.memberData.id
      getChatHistoryList(this.getQueryDialogParams()).then(response => {
        this.historyList = response.page
        this.dialogPaging.totalElements = response.total
        this.dialogPaging.isLoading = false
      })
    },
    handleSizeChange(val) {
      this.paging.query.rows = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.paging.query.page = val
      this.getList()
    },
    handleHistoryCurrentChange(val) {
      this.dialogPaging.query.page = val
      this.getChatHistoryList()
    },
    addBatch() { },
    handleCreate() {
      this.formData = deepClone(this.defaultFormData)
      this.dialogFormVisible = true
      this.dialogType = DialogType.Create
      this.isShowRoleOption = true
      this.imageData = null

      this.rules.password = [
        ...Rules.noSpace, ...Rules.requiredBlur,
        { trigger: 'blur', pattern: Regex.passwordV2, message: this.$t('rules.onlyEnAndNum') },
        { trigger: 'blur', min: 4, max: 20, message: this.$t('rules.fourToTwentyLengthWords') }
      ]

      this.rules.nickName = [
        ...Rules.nickname,
        { trigger: 'blur', min: 1, max: 20, message: this.$t('rules.oneToTwentyLengthWords') }
      ]
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addMember(this.serializeFormData(this.formData)).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.imageData = null
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateMember(this.serializeFormData(this.formData)).then(() => {
            this.getList()
            this.imageData = null
            this.editDialogFormVisible = false
          })
        }
      })
    },
    sendMessage() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          sendMessage(this.formData).then()
          this.sendMessageDialogFormVisible = false
        }
      })
    },
    handleClearHistory(row) {
      this.formData = objectMerge(deepClone(this.defaultFormData), row)
      this.clearHistoryDialogFormVisible = true
    },
    clearChatHistory() {
      if (this.formData.type === ClearHistoryType.All) {
        this.formData.count = '-1'
      } else if (this.formData.type === ClearHistoryType.Hundred) {
        this.formData.count = '100'
      }

      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const data = {
            id: this.memberData.id,
            friendId: this.formData.memberId,
            count: this.formData.count
          }
          clearChatHistory(data).then()
          this.clearHistoryDialogFormVisible = false
        }
      })
    },
    handleChatDetail(row) {
      this.chatHistoryDialogFormVisible = false
      this.$router.push({
        path: '/message/messageList',
        query: { account1: this.memberData.memberName, account2: row.memberName }
      })
    },
    handleDeleteFriend(row) {
      this.operationDialogVisible = true
      this.operationTitle = this.$t('userList.operationTitle')
      this.operationText = this.$t('userList.deleteFriendText')
      this.operationKey = 'deleteFriend'
      this.formData.id = row.id
    },
    onSortChange(column) {
      if (column.prop) {
        this.paging.query.sort = `${column.prop},${column.order === 'ascending' ? 'ASC' : 'DESC'}`
        this.getList()
      }
    },
    number_change(e) {
      // 在输入的时候就要判断只能输入正整数
      e.target.value = e.target.value.replace(/[^0-9]/g, '')
      // 然后在每次keyup时把值赋给v-model
      if (!e.target.value) {
        // 这里给undefined是因为不给值就会默认变为1，不会为空，导致用户输入不了别的数值
        if (this.withdrawDialogFormVisible) {
          this.formData.amount = undefined
        } else if (this.clearHistoryDialogFormVisible) {
          this.formData.count = undefined
        }
      } else {
        if (this.withdrawDialogFormVisible) {
          this.formData.amount = e.target.value
        } else if (this.clearHistoryDialogFormVisible) {
          this.formData.count = e.target.value
        }
      }
    },
    ruleNumberCheck(rule, value, callback) {
      if (rule.field !== 'amount') {
        if (this.formData.amount === undefined) {
          callback(new Error(this.$t('rules.count')))
        }

        if (!checkNum(this.formData.amount, 1)) {
          callback(new Error(this.$t('rules.count')))
        }
      } else {
        if (this.formData.amount === undefined) {
          callback(new Error(this.$t('rules.count')))
        }

        if (!checkNum(this.formData.amount, 1)) {
          callback(new Error(this.$t('rules.count')))
        }
      }
      callback()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.avatar {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  display: block;
  min-width: 32px;
  align-self: center;
}

.flex_container {
  display: flex;
  flex-direction: row;
}

.rightbox {
  display: flex;
  flex-direction: column;

  .inbox {
    display: flex;
    flex-direction: row;
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}

.placeholder:hover {
  background: #E0E0E0;
}

.file-input {
  display: none;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.input-row {
  display: flex;

  .el-input {
    width: initial;
  }

  span {
    padding: 0 10px;
  }
}
</style>

import { makeAutoObservable } from 'mobx'
import {
  queryActivityList,
  queryCmsData,
  querySkillBadgeCertifiedNum,
  queryTopicComment,
} from '@/api/heimlich'
import { Toast } from 'antd-mobile'
import { getCity, getPosition } from '@/utils/utility'

class Heimlich {
  cityInfo = {
    cityName: '南京',
    cityCode: '320100',
  }
  position = {
    lat: '',
    lng: '',
  }
  cmsData: any = null
  badgeData = {
    totalNum: '',
    userRank: -1,
    isUnlocked: false,
    isShared: false,
  }
  prizeList: any[] = []
  certPrizeList: any[] = []
  certPirzeCids: any[] = []
  certPrizesSendResult: any[] = []
  sharePrizeList: any[] = []
  sharePirzeCids: any[] = []

  activityList: any[] = []
  commentList: any[] = []
  commentListQuery = {
    loading: false,
    finished: false,
    params: {
      pageNo: 1,
      pageSize: 6,
      sort: 2,
    },
  }
  isSharing = false //点了分享按钮且则分享中，页面重新显示后则分享结束

  questions?: any = undefined

  constructor() {
    makeAutoObservable(this)
  }

  async getLocationInfo() {
    this.position = await getPosition()
    this.cityInfo = await getCity()
  }

  async getCmsData() {
    try {
      const res = await queryCmsData()
      this.cmsData = res.data
      return res.data
    } catch (error) {
      console.error(error)
      Toast.fail('网络异常或数据错误')
      return null
    }
  }

  async getBadgeData() {
    try {
      // 查询海姆立克育儿技能徽章认证数
      const res = await querySkillBadgeCertifiedNum({ skillCode: 10 })
      if (res.content?.result) {
        this.badgeData.isUnlocked =
          !!res.content.result.userRank && res.content.result.userRank > 0 // 当前用户有排名则已解锁
        this.badgeData.userRank =
          !!res.content.result.userRank && res.content.result.userRank
        this.badgeData.totalNum = res.content.result.certifiedTotalNum
      }
      // 根据组件id查询分享奖品
      const sharePirzeReceived = false
      const sharePirzeCids = this.cmsData?.prizeConfig.sharePrizes.map(
        (item: any) => item.cid
      )
      if (sharePirzeCids) {
        for (const sharePirzeCid of sharePirzeCids) {
          const prizeList =  []
        }
      }
      this.badgeData.isShared = sharePirzeReceived // 奖品有领取过则用户已分享
    } catch (error) {
      console.error(error)
      // if ( error === 'login') {
      //   login()
      // }
    }
  }

  async getPrizeList() {
    if (this.cmsData) {
      const prizes = this.badgeData.isUnlocked
        ? this.cmsData.prizeConfig.sharePrizes
        : this.cmsData.prizeConfig.certifyPrizes
      this.prizeList = prizes.map((item: any) => item.list).flat()

      const sharePrizesCfg = this.cmsData.prizeConfig.sharePrizes
      this.sharePrizeList = sharePrizesCfg.map((item: any) => item.list).flat()

      const certPrizesCfg = this.cmsData.prizeConfig.certifyPrizes
      this.certPrizeList = certPrizesCfg.map((item: any) => item.list).flat()

      this.certPirzeCids = this.cmsData.prizeConfig.certifyPrizes.map(
        (item: any) => item.cid
      )

      this.sharePirzeCids = this.cmsData.prizeConfig.sharePrizes.map(
        (item: any) => item.cid
      )
    } else {
      this.prizeList = []
      this.certPrizeList = []
      this.sharePrizeList = []
      this.certPirzeCids = []
      this.sharePirzeCids = []
    }
  }

  async getActivityList() {
    try {
      const res = await queryActivityList({
        cityCode: this.cityInfo.cityCode,
        page: 1,
        pageSize: 3,
        typeCode: '10171140,10171154',
        type: 2,
        orderByCond: 3,
        lat: this.position.lat ? +this.position.lat : undefined,
        lng: this.position.lng ? +this.position.lng : undefined,
      })
      this.activityList = res.data?.list || []
    } catch (error) {
      console.error(error)
    }
  }

  async getCommentList(reset = false) {
    if (reset) {
      this.commentListQuery.params.pageNo = 1
      this.commentListQuery.finished = false
      this.commentList = []
    }
    if (!this.cmsData) {
      return
    }
    if (this.commentList.length == 0) {
      this.commentList = [...this.cmsData.homeConfig.dajiashuo.commentList]
    }
    const topicId = this.cmsData.homeConfig.dajiashuo.topicInfo.id
    if (!topicId) {
      return
    }
    this.commentListQuery.loading = true
    try {
      const res = await queryTopicComment({
        topicId,
        ...this.commentListQuery.params,
      })
      if (res.data?.list?.length > 0) {
        const newList = res.data.list.map((item: any) => ({
          image: item.imageList[0],
          content: item.comment,
          userAvatar: item.headImage,
          userName: item.nickName,
          likeFlag: item.likeFlag,
          likeNum: item.likeNum,
          id: item.commentId,
          activityId: item.activityId,
          uid: item.uid,
        }))
        this.commentList.push(...newList)
        this.commentListQuery.params.pageNo++
        this.commentListQuery.finished = true
      }
    } catch (error) {
      console.error(error)
      this.commentListQuery.finished = true
    } finally {
      this.commentListQuery.loading = false
    }
  }

  async getCertPrizesSendResult() {
    const cids = this.certPirzeCids
    const prizeList: any[] = []
    if (cids && Array.isArray(cids) && cids.length > 0) {
      for (const cid of cids) {
        const res: any = null
        const rewards: any[] = (res && res.data) || []
        if (rewards && Array.isArray(rewards) && rewards.length > 0) {
          prizeList.push(...rewards)
        }
      }
    }
    this.certPrizesSendResult = prizeList
  }

  setShared() {
    this.badgeData.isShared = true
  }

  setQuestions(data?: any) {
    console.log(this)

    this.questions = data
  }
}

export default new Heimlich()

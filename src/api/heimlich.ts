import Cookies from 'js-cookie'
import {
  QUERY_HEIMLICH_CMS,
  QUERY_ACTIVITY_LIST,
  QUERY_SKILL_BADGE_CERTIFIED_NUM,
  QUERY_TOPIC_COMMENT2
} from '@/constants'
import axios from 'axios'
import qs from 'qs'
import request from '@/utils/request'
import _ from 'lodash'
import { queryActListParam } from './home'
import { TopicCommentParam } from '@/interface/topicDetail'

export const queryCmsData = () => {
  return request(
    QUERY_HEIMLICH_CMS,
    { credentials: 'omit' },
    {
      codeField: 'code',
      msgField: 'message',
      isSuccess: body => _.get(body, 'code') == 0
    }
  )
}

/* 育儿技能徽章认证数 */
export const querySkillBadgeCertifiedNum = (params: { skillCode: number }) => {
  const uid = Cookies.get('uid') || ''
  const skey = Cookies.get('skey') || ''
  return request(
    `${QUERY_SKILL_BADGE_CERTIFIED_NUM}?skillCode=${params.skillCode}&uid=${uid}&skey=${skey}`, //技能编码，海姆利克编码为10
    {},
    {
      isSuccess: body => _.get(body, 'code') == '0'
    }
  )
}

/**
 * 查询话题评价
 * @param param
 * @returns
 */
export const queryTopicComment = (param: TopicCommentParam) => {
  // 根据活动ID获取推荐活动
  return request(
    `${QUERY_TOPIC_COMMENT2}?param=${JSON.stringify(param)}`,
    {},
    {
      msgField: 'message',
      hideNotify: true,
    }
  )
}

/* 活动列表 */
export const queryActivityList = (params: any) => {
  return request(
    `${QUERY_ACTIVITY_LIST}?param=${JSON.stringify(params)}`,
    {},
    {
      isSuccess: body => _.get(body, 'code') == '1'
    }
  )
}

/**
 * 话题详情
 * @property topicId
 */
export interface TopicInfoParam {
  topicId: string
}

/**
 * 根据活动ID查询话题ID
 * @property topicId
 */
export interface TopicIdParam {
  activityId: string
}

/**
 * 评论点赞/取消点赞
 * @property topicId 话题ID
 * @property pageNo 评价ID
 * @property pageSize 原评价发布人uid
 * @property sort 场景Id 0:点赞  1:取消点赞
 */
export interface TopicCommentParam {
  topicId: string
  pageNo: number
  pageSize: number
  sort: number
}

/**
 * 打卡记录
 * @property topicId 话题ID
 * @property pageIndex 
 * @property pageSize 
 * @property listType 1.最新 2.最热 3.我的
 */
export interface TopicPunchParam {
  topicId: string
  pageIndex: number
  pageSize: number
  listType: number
}

/**
 * 评论点赞/取消点赞
 * @property uid
 * @property skey
 * @property commentId 评价ID
 * @property commentUid 原评价发布人uid
 * @property sceneId 场景Id 0:点赞  1:取消点赞
 */
export interface doLikeCommentParam {
  uid: number | string
  skey: string
  commentId: number
  commentUid: number
  sceneId: number
}

import React from 'react'
import Style from './index.module.scss'
import Masonry from 'react-masonry-component'
import { observer } from 'mobx-react'
import { useStores } from '@/hooks'
import Cookies from 'js-cookie'

type PropsType = {
  topicInfo: any
  commentList: any[]
}

const Comments: React.FC<PropsType> = observer(props => {
  const { topicInfo, commentList } = props

  const { heimlich } = useStores()

  const topicClick = () => {
    if (topicInfo.id) {
      location.href = `/interaction-activity/topic/${topicInfo.id}?kwtarget=blank`
    }
  }

  const commentClick = (comment: any, index: number) => {
    const { id, activityId = '', uid = '' } = comment
    const isTopicPunch = topicInfo.isPunch
    if (id) {
      location.href = `/interaction-activity/commentdetail?commentId=${id}&activityId=${activityId}&tuid=${uid}&realType=${isTopicPunch ? 1 : 0}&kwtarget=blank`
    }
  }

  return (
    <div className={Style.comments}>
      <h2 className={Style.commentsTitle}>海姆立克大家说</h2>
      <Masonry
        className={Style.commentList}
        updateOnEachImageLoad={true}
        options={{
          gutter: Math.floor(
            Number(document.documentElement.style.fontSize.slice(0, -2)) * 0.18
          ),
          // 左右间距18px
          transitionDuration: 0,
          fitWidth: false
        }}
      >
        {/* 第一个为话题 */}
        {topicInfo.image && (
          <div
            className={`${Style.commentItem} ${Style.topic}`}
            onClick={topicClick}
          >
            <img className={Style.commentImg} src={topicInfo.image} />
            <div className={Style.commentContent}>
              <div className={Style.commentTag}>有奖话题</div>
              <p className={Style.commentTitle}>{topicInfo.name}</p>
              <div className={Style.commentUser}>
                <img
                  className={Style.commentUserAvatar}
                  src={topicInfo.userAvatar1}
                />
                <img
                  className={Style.commentUserAvatar}
                  src={topicInfo.userAvatar2}
                />
                <img
                  className={Style.commentUserAvatar}
                  src={topicInfo.userAvatar3}
                />
                <span className={Style.commentUserParti}>
                  {topicInfo.participateNum}人已参与
                </span>
              </div>
              <button className={Style.commentLookButton}></button>
            </div>
          </div>
        )}
        {/* 其余为评论 */}
        {commentList.map((comment, index) => (
          <div
            className={`${Style.commentItem}`}
            key={index}
            onClick={() => {
              commentClick(comment, index)
            }}
          >
            <img className={Style.commentImg} src={comment.image + '?imageView2/w/684/q/80'} />
            <div className={Style.commentContent}>
              <p className={Style.commentTitle}>{comment.content}</p>
              <div className={Style.commentUser}>
                <img
                  className={Style.commentUserAvatar}
                  src={comment.userAvatar}
                />
                <span className={Style.commentUserName}>
                  {comment.userName}
                </span>
                {comment.likeNum >= 0 &&
                  <>
                    <i
                      className={`${Style.commentUserLikeIcon} ${comment.likeFlag ? Style.liked : ''}`}
                    ></i>
                    <span className={Style.commentUserLikeNum}>
                      {comment.likeNum}
                    </span>
                  </>
                }
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  )
})

export default Comments

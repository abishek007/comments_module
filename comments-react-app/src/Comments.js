import React, { Component, Fragment } from "react"
import "./Styles.css"

class Comments extends Component {

  state = {
    textAreaValue: "",
    commentsArr: [],
    selectedCommentId: "",
    replyValue: "",
  }

  handleCommentChange = (event) => {
    this.setState({ textAreaValue: event.target.value })
  }

  handleReplyCommand = (event) => {
    this.setState({ replyValue: event.target.value })
  }

  handleReply = (id) => {
    this.setState({ selectedCommentId: id })
  }

  handleAddComment = () => {
    const { commentsArr, textAreaValue } = this.state
    const tempComments = commentsArr

    const today = new Date().toLocaleDateString('en-GB', {
      day : 'numeric',
      month : 'short',
      year : 'numeric'
    }).split(" ").join("-")

    tempComments.push({ postData: textAreaValue , date: today, id: commentsArr.length })

    this.setState({ textAreaValue: "", commentsArr: tempComments })
  }

  handleAddReplyComment = () => {
    const { commentsArr, replyValue, selectedCommentId } = this.state
    const tempComments = commentsArr

    const today = new Date().toLocaleDateString('en-GB', {
      day : 'numeric',
      month : 'short',
      year : 'numeric'
    }).split(" ").join("-")

    if (Array.isArray(tempComments[selectedCommentId].replyComment)) {
      tempComments[selectedCommentId].replyComment.push({ postData: replyValue , date: today, id: commentsArr.length })
    } else {
      tempComments[selectedCommentId].replyComment = [{ postData: replyValue , date: today, id: commentsArr.length }]
    }

    this.setState({ replyValue: "", commentsArr: tempComments, selectedCommentId: "" })
  }

  render() {
    const { textAreaValue, commentsArr, selectedCommentId, replyValue } = this.state
    return (
    <Fragment>
      <p className="comments-heading">Comments Module</p>
      <div className="comments-container">
        <textarea value={textAreaValue} onChange={this.handleCommentChange} cols={80} rows={6} />
        <button className="add-btn" onClick={this.handleAddComment}>Add</button>
      </div>
      <div className="comments-post-sec">
        {commentsArr && commentsArr.length > 0 && commentsArr.map((element) => (
          <Fragment>
             <div className="comment-post">
              <span>{element.postData}</span>
              <span className="time-sec">
                {element.date}
                <button className="reply-btn" onClick={() => this.handleReply(element.id)}>Reply</button>
              </span>
            </div>
            {(selectedCommentId === element.id) &&
              <div className="reply-container">
                <textarea value={replyValue} onChange={this.handleReplyCommand} cols={60} rows={2} />
                <button className="reply-btn" onClick={this.handleAddReplyComment}>Save</button>
              </div>
            }
            {element.replyComment && element.replyComment.map((replyElem) => (
              <div className="comment-post reply-post">
                <span>{replyElem.postData}</span>
                <span className="time-sec">
                  {replyElem.date}
                </span>
              </div>
            ))
            }
          </Fragment>
         
        ))}
      </div>
    </Fragment>
    )
  }
}
export default Comments

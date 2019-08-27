import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import config from '../config';
import BookmarksContext from '../BookmarksContext';

function deleteBookMarkRequest(bookmarkId, callback){
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization' : `bearer ${config.API_KEY}`
    }
  })
  .then(res => {
    if(!res.ok){
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    callback(bookmarkId)
  })
  .catch(error => {
    console.log(error)
  })
}

export default function BookmarkItem(props) {

  return (
    <BookmarksContext.Consumer>
      {(context) => (
        <li className='BookmarkItem'>
          <div className='BookmarkItem__row'>
            <h3 className='BookmarkItem__title'>
              <a
                href={props.url}
                target='_blank'
                rel='noopener noreferrer'>
                {props.title}
              </a>
            </h3>
            <Rating value={props.rating} />
          </div>
          <p className='BookmarkItem__description'>
            {props.description}
          </p>
          <div className='BookmarkItem__buttons'>
            <button
              className='BookmarkItem__description'
              onClick={() => {
                deleteBookMarkRequest(
                  props.id,
                  context.deleteBookmark,
                )
              }}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}

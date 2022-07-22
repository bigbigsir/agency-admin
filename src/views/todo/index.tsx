import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectAll, TodoItem } from '@/store/slice/todo'
import { getTodoList, setOne, removeOne, updateOne } from '@/store/slice/todo/actions'
import { EntityId, nanoid } from '@reduxjs/toolkit'
import { setToken } from '@/store/slice/token/actions'
import { useNavigate } from 'react-router'
import styles from './index.module.scss'

function Index () {
  const todo = useAppSelector(state => state.todo)
  const list = useSelector(selectAll)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function _getTodoList () {
    dispatch(getTodoList(30))
  }

  function _setOne () {
    dispatch(setOne({ id: nanoid(), index: todo.ids.length + 1 }))
  }

  function logout () {
    dispatch(setToken(null))
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div>
        {
          list.map(item => (
            <Item key={item.id} item={item}/>
          ))
        }
      </div>
      <button className={'button'} onClick={_setOne}>_setOne</button>
      <button className={'button'} onClick={_getTodoList}>_getTodoList</button>
      <br/>
      <button className={'button'} onClick={() => dispatch(setToken(null))}>退出登陆记录退出页</button>
      <button className={'button'} onClick={logout}>退出登陆无记录页</button>
    </div>
  )
}

interface Props {
  item: TodoItem
}

function Item1 ({ item }: Props) {
  const dispatch = useAppDispatch()

  function _removeOne (item: EntityId) {
    dispatch(removeOne(item))
  }

  function _updateOne (item: EntityId) {
    dispatch(updateOne({ id: item, changes: { index: Math.ceil(Math.random() * 1000) } }))
  }

  return (
    <p key={item.id}>
      <span>{item.index}</span>
      <button className={'button'} onClick={() => _removeOne(item.id)}>_removeOne</button>
      <button className={'button'} onClick={() => _updateOne(item.id)}>_updateOne</button>
    </p>
  )
}

const Item = memo(Item1)
// const Item = Item1

export default Index

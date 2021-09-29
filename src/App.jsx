import React, {useState, useEffect, useRef, useMemo, useCallback } from 'react';
import CreateUser from "./Components/CreateUser";
import UserList from "./Components/UserList";

const countActiveUsers = (users) => {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active === true).length;
}

const App = () => {

  const [input, setInput] = useState({
    username: '',
    email: '',
    id: ''
  }) 

  const {username, email, id} = input;

  const onChange = useCallback((e)=>{
    const {name, value} = e.target;
    setInput(input => ({
      ...input,
      [name]:value
    }))
  }, [])

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);
  
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const newUser ={
      id: nextId.current,
      username:username,
      email:email
    }
    setUsers(users => ([
      ...users, newUser//users=객체모음, newUser=추가힐 객체
    ]))
    setInput({
      username: '',
      email: ''
    })

    nextId.current += 1;
  },[username, email])

  const onUpdate = useCallback(() => {
    setUsers(users => (
      users.map(user => user.id === id ? {...user, username: username, email : email} : user)
    ))
    setInput({
      username: '',
      email: '',
      id: '',
    })
  },[id, username, email])

  const onRemove = useCallback((id) => {
    setUsers(users => users.filter(user => user.id !== id));
  }, [])

  const onToggle = useCallback((id) => {
    setUsers(users => 
      users.map(user => user.id === id? {...user, active : !user.active} : user)
    )
  }, [])
  //파라미터 id를 useCallback의 두번째 인자에 안써도 되는 이유는 useCallback함수를 사용할때마다 인자에 id가 입력받기 때문이다. 우리는 useCallback안에서 사용되는 상태 or props만 신경쓰면 된다.

  const onModify = useCallback((user) => {
    setInput({
      username: user.username,
      email: user.email,
      id: user.id
    })
  }, [])
  
  const count = useMemo(() => countActiveUsers(users), [users]);

  return(
    <div>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} onUpdate={onUpdate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} onModify={onModify}/>
      <div>활성사용자 수: {count}</div>
    </div>
  )
}

export default App;

//https://react.vlpt.us/basic/18-useCallback.html
//이부분의 dev tools 까는것부터, chrome에서 작동함
//웨일에서 작동안함 ㅋ
 
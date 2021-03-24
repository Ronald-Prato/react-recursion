import './App.css';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { ISingleChild } from './models';
import React from 'react';
import { SingleChildWrapper } from './styled';
import _ from 'lodash'
import { data } from './data'

function App() {
  const [childsTree, setChildsTree] = useState<{[parent: string]: number[]}>({})
  const [chekedStates, setChekedStates] = useState<{[parent: string]: boolean[]}>({})

  let childAuxStates = useMemo(() => ({...childsTree}), [childsTree])
  let checkedAuxStates = useMemo(() => ({...chekedStates}), [chekedStates]) 
  
  const recursivelyAddChildState = (localChilds: any[]) => {
    localChilds.forEach(singleChild => {
      if (singleChild.childs) {
        childAuxStates[singleChild.id] = singleChild.childs.map((subChild: any) => subChild.id)
        childAuxStates[singleChild.id].unshift(singleChild.id)
        recursivelyAddChildState(singleChild.childs)
      }
    })
    
    setChildsTree(childAuxStates)
  }

  useEffect(() => {
    data && data.forEach(singleCategory => {
      console.log(singleCategory.name)
      if (singleCategory.childs) {
        childAuxStates[singleCategory.id] = singleCategory.childs.map((subChild: any) => subChild.id)
        childAuxStates[singleCategory.id].unshift(singleCategory.id)
        recursivelyAddChildState(singleCategory.childs)
      }
    })
  }, [])

  useEffect(() => {
    Object.keys(childAuxStates).forEach((singleParent, index) => {
      checkedAuxStates[singleParent] = childAuxStates[singleParent].map(() => false)
      
      index === Object.keys(childAuxStates).length - 1 && setChekedStates(checkedAuxStates)
    })
  }, [childAuxStates])

  const getParentId = (id: number) => {
    // Look for the position of the "true" value representing the position of the found id within one of the child's array
    const parentArraySearch = _.values(childsTree).map((singleChild) => (
      singleChild.includes(id)
    ))

    return (_.keys(childsTree)[parentArraySearch.indexOf(true)])
  }
  

  const SingleChild = React.memo(({ id, name, childs, childIndex }: ISingleChild) => {
    const [showChildren, setShowChildren] = useState<boolean>(false)

    const handleClick = useCallback(() => {
      setShowChildren(!showChildren)
    }, [showChildren, setShowChildren])

    const handleChangeState = (newState: boolean) => {
      // Check if selected checkbox is a parent, if it is, turn every child to true
      if (_.keys(childsTree).includes((id).toString())) {
        chekedStates[id] = chekedStates[id].map(() => true)
        setChekedStates(chekedStates)
        return 
      }

      // Copy of checkedStates value
      let auxCheckedStates = {...chekedStates}
      
      // Look for the index of the keys related to the position of the "true" element in parentArraySearch array
      const parentId = getParentId(id)
      auxCheckedStates[parentId][childIndex as number] = newState
      console.log("DONE")
    }

    return (
      <SingleChildWrapper>
        <div className={'sub-child-data'}>
          <div style={{cursor: childs ? 'pointer' : 'normal'}} onClick={handleClick} className={'sub-child-text'}>
            <p onClick={() => alert(getParentId(1))}> {id} </p>
            <p> {name} </p>
          </div>
          
          {
            _.keys(chekedStates).length && 
            <input checked={chekedStates[getParentId(id)][childIndex as number]} onChange={(event) => handleChangeState(event.target.checked)} type="checkbox"/>
          }
          
        </div>

        <div className={'recursivity-wrapper'}>
          { showChildren && (childs ?? []).map((node: ISingleChild, index) => <SingleChild key={node.id} {...node} childIndex={index} />) }
        </div>
      </SingleChildWrapper>
    )
  })

  return (
    <div className="App">
      {
        data.map((category: ISingleChild, index) => (
          <SingleChild key={category.id} {...category} childIndex={index} />
        ))
      }

      <button onClick={() => console.log(childsTree)}> Check Childs </button>
      <button onClick={() => console.log(chekedStates)}> Check States </button>
    </div>
  );
}

export default App;

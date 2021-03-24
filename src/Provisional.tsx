import './App.css';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { ISingleChild } from './models';
import { SingleChildWrapper } from './styled';
import _ from 'lodash'
import { data } from './data'

function Provisional() {
  const [childsTree, setChildsTree] = useState<{[parent: string]: number[]}>({})
  const [chekedStates, setChekedStates] = useState<{[id: number]: boolean}>({})
  const [toggleStates, setToggleStates] = useState<{[id: number]: boolean}>({})

  let childAuxStates = useMemo(() => ({...childsTree}), [childsTree])
  let checkedAuxStates = useMemo(() => ({...chekedStates}), [chekedStates]) 
  let toggleAuxStates = useMemo(() => ({...toggleStates}), [toggleStates]) 
  
  const recursivelyAddChildState = useCallback((localChilds: any[]) => {
    localChilds.forEach(singleChild => {
      checkedAuxStates[singleChild.id] = false
      toggleAuxStates[singleChild.id] = false

      if (singleChild.childs) {
        childAuxStates[singleChild.id] = singleChild.childs.map((subChild: any) => subChild.id)
        recursivelyAddChildState(singleChild.childs)
      }
    })
    
    setChekedStates(checkedAuxStates)
    setChildsTree(childAuxStates)
  }, [checkedAuxStates, childAuxStates])

  

  useEffect(() => {
    data && data.forEach(singleCategory => {
      checkedAuxStates[singleCategory.id] = false
      toggleAuxStates[singleCategory.id] = false

      if (singleCategory.childs) {
        childAuxStates[singleCategory.id] = singleCategory.childs.map((subChild: any) => subChild.id)
        recursivelyAddChildState(singleCategory.childs)
      }
    })
  }, [])

  const SingleChild = ({ id, name, childs }: ISingleChild) => {
    const treeKeys = _.keys(childsTree)
    const [showChildren, setShowChildren] = useState<boolean>(false)

    const handleClick = useCallback((id: number) => {
      setToggleStates({...toggleAuxStates, [id]: !toggleAuxStates[id]})
    }, [])
    
    const recursivelyMarkChilds = (childs: number[], auxCheckedStates: {[id: number]: boolean}, newState: boolean) => {

      childs.forEach((singleChildId) => {
        auxCheckedStates[singleChildId] = newState

        if (treeKeys.includes(singleChildId.toString())) {
          recursivelyMarkChilds(childsTree[singleChildId.toString()], auxCheckedStates, newState)
        }
      })

      setChekedStates(auxCheckedStates)
    }

    const handleChangeState = (newState: boolean) => {
      const treeKeys = _.keys(childsTree)
      // Check if selected checkbox is a parent, if it is, turn every child to true
      if (treeKeys.includes((id).toString())) {
        let auxCheckedStates = {...chekedStates}

        // First check the parent:
        auxCheckedStates[id] = newState

        // Then, recursively mark every child above it
        recursivelyMarkChilds(childsTree[id], auxCheckedStates, newState)
        return
      } 

      // Just change one check state
      setChekedStates({...chekedStates, [id]: newState})
    }

    return (
      <SingleChildWrapper>
        <div className={'sub-child-data'}>
          <div style={{cursor: childs ? 'pointer' : 'normal'}} onClick={() => handleClick(id)} className={'sub-child-text'}>
            <p> {id} </p>
            <p> {name} </p>
          </div>
          
          {
            // _.keys(chekedStates).length && 
            <input checked={chekedStates[id]} onChange={(event) => handleChangeState(event.target.checked)} type="checkbox"/>
          }
        </div>

        <div className={'recursivity-wrapper'}>
          { toggleAuxStates[id] && (childs ?? []).map((node: ISingleChild, index) => <SingleChild key={node.id} {...node} />) }
        </div>
      </SingleChildWrapper>
    )
  }

  return (
    <div className="App">
      {
        data.map((category: ISingleChild, index) => (
          <SingleChild key={category.id} {...category} />
        ))
      }

      <button onClick={() => console.log(childsTree)}> Check Childs </button>
      <button onClick={() => console.log(chekedStates)}> Check States </button>
    </div>
  );
}

export default Provisional;

import styled from 'styled-components'

export const SingleChildWrapper = styled.div `

  div.sub-child-data {
    display: flex;
    justify-content: left;
    align-items: center;
    
    input {
      margin-left: 20px;
    }

    div.sub-child-text {
      display: flex;
  
      p:nth-child(even) {
        margin-left: 8px;
        color: white;
        font-weight: lighter;
        
      }
      p:nth-child(odd) {
        font-weight: bolder;
        color: lightblue;
      }
  
      p {
        width: fit-content;
      }
    }
  }

  div.recursivity-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    left: 25px;
    border-left: .6px solid lightblue;
    padding-left: 15px;
  }
`;
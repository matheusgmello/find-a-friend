import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.main`
  max-width: 1112px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  position: relative;
`

export const Card = styled.div`
  width: 488px;
  height: 661px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: center;

  position: sticky;
  left: 0;
  top: 0;

  background-color: #f15156;
  border-radius: 20px;
  padding: 107px 52px 39px;

  .logo {
    width: 174px;
  }
`

export const FormWrapper = styled.div`
  width: 488px;
  height: 661px;
  display: block;
  overflow-y: auto;

  h1 {
    font-size: 54px;
    color: #0d3b66;
    line-height: 90%;
    letter-spacing: -2px;
    text-align: center;
    margin-bottom: 101px;
  }
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;

  background-color: #f5f8fa;
  border: 1px solid #d3e2e5;
  border-radius: 10px;
  padding: 18px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-top: 61px;

  .primary {
    color: #ffffff;
    background-color: #0d3b66;
  }

  .secondary {
    color: #0d3b66;
    background-color: #f5f8fa;
  }
`
export const Button = styled.button`
  width: 100%;
  height: 72px;

  font-size: 20px;
  font-weight: 800;
  text-align: center;
  border-radius: 20px;
  padding: 19px auto;
  border: none;
`

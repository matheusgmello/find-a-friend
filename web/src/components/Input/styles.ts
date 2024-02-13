import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 16px;
    font-weight: 600;
    color: #0d3b66;
    margin-bottom: 8px;

    > span {
      display: inline-block;
      margin-left: 1.5rem;
      color: ${(props) => props.theme.colors.gray};
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.125rem;
    }
  }
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;

  background-color: #f5f8fa;
  border: 1px solid #d3e2e5;
  border-radius: 10px;
  padding: 18px;

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.tertiary};
  }

  input,
  textarea {
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    color: #0d3b66;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
  }

  img,
  svg {
    cursor: pointer;
  }
`

export const ErrorMessage = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.danger};
  margin-top: 0.25rem;
`

// Select

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
`

export const FilterLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #0d3b66;
  margin-bottom: 8px;
`

export const FilterWrapper = styled.div`
  position: relative;

  background-color: #f5f8fa;
  border: 1px solid #d3e2e5;
  border-radius: 10px;

  &:focus-within {
    border: 1px solid ${(props) => props.theme.colors.tertiary};
  }

  & > img,
  svg {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }

  label {
    font-size: 16px;
    font-weight: 600;
    color: #0d3b66;
    margin-bottom: 8px;

    > span {
      display: inline-block;
      margin-left: 1.5rem;
      color: ${(props) => props.theme.colors.gray};
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.125rem;
    }
  }
`

export const FilterInput = styled.select`
  width: 100%;
  height: 60px;
  font-size: 16px;
  line-height: 19.2px;
  font-weight: 800;
  color: #ffffff;
  background-color: #f75f64;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 20px;
  appearance: none;
  position: relative;

  &::before {
    content: '⌄';
    width: 12px;
    height: 6px;
    display: absolute;
    color: #ffffff;
  }

  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: #0d3b66;
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
`

export const FilterInputOption = styled.option`
  font-family: 'Nunito';
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: inherit;
  padding: 5px 7px;
`

import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
    display: inline-block;
    background-color: ${props => props.theme.text};
    color: ${props => props.theme.body};
    outline: none;
    border: none;
    margin-left: 10px;
    margin-right: 10px;

    font-size: ${props => props.theme.fontmd};
    padding: 0.9rem 2.3rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    &:hover{
        transform: scale(0.9);
    }

    &::after{
        content: ' ';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        border: 2px solid ${props => props.theme.text};
        width: 100%;
        height: 100%;
        border-radius: 50px;
        transition: all 0.2s ease;
    }

    &:hover::after{
        transform: translate(-50%, -50%) scale(1);
        padding: 0.3rem;
    }
`

const BtnLight = styled.button`
    display: inline-block;
    background-color: #ffff;
    color: #202;
    outline: solid;
    border: none;
    margin-left: 10px;
    margin-right: 10px;
    
    

    font-size: ${props => props.theme.fontmd};
    padding: 0.9rem 1.2rem ;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    &:hover{
        transform: scale(0.9);
    }

    &::after{
        content: ' ';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        border: 2px solid ${props => props.theme.text};
        width: 100%;
        height: 100%;
        border-radius: 50px;
        transition: all 0.2s ease;
    }

    &:hover::after{
        transform: translate(-50%, -50%) scale(1);
        padding: 0.3rem;
    }
`

const BtnNonLine = styled.button`
    display: inline-block;
    background-color: rgb(0 0 0 / 0%);
    color: #202;
    outline: none;
    border: none;

    font-size: ${props => props.theme.fontmd};
    padding: 0.9rem 2.3rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
`

const Button = ({style="default", text, link, click}) => {

    if (style == "default") {
        return (
            <a href={link} aria-label={text} onClick={click} target="_blank" rel="noreferrer" >
                <Btn>{text}</Btn>
            </a>
          )
    } else if (style == "non-outline") {
        return (
            <a href={link} aria-label={text} onClick={click} target="_blank" rel="noreferrer" >
                <BtnNonLine>{text}</BtnNonLine>
            </a>
            
        )
    } else {
        return (
            <a href={link} aria-label={text} onClick={click} target="_blank" rel="noreferrer" >
                <BtnLight>{text}</BtnLight>
            </a>
        )
    }
}

export default Button
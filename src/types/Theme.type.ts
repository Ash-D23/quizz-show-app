import React, { Dispatch } from 'react';

export type ThemeSetterType = Dispatch<string> | null

export type ThemeType = { Theme: string,
    setDarkMode: () => ThemeSetterType, 
    setLightMode: () => ThemeSetterType
   }
import {test as base,Page,expect} from '@playwright/test';

type loggedinUser = {
    loggedinUser:Page
}

export const test =base.extend<loggedinUser>({
  loggedinUser: async ({page},use) => {
    //login steps
    console.log('Login successful');
    await use(page);
  }
})

export{expect} 
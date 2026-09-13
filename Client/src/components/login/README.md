# Login component structure

Drop this whole `login/` folder into the Lead Management client at
`Client/src/components/login/` and import it with:

```jsx
import { Login } from "./components/login";
```

## Files

| File | Responsibility |
| --- | --- |
| `Login.jsx` | Page shell + card layout, wires the hook to the form |
| `LoginForm.jsx` | Form markup (email, password, submit) — presentational |
| `EmailField.jsx` | Email `TextField` |
| `PasswordField.jsx` | Password `TextField` + show/hide adornment |
| `useLoginForm.js` | All state, change handling, validation, submit |
| `login.validation.js` | Pure validation + whitespace sanitizing |
| `auth.api.js` | `POST /admin/login` and token persistence |
| `login.constants.js` | API base URL, email regex, initial state |
| `login-form.module.scss` | Layout + color tokens for the whole screen |

No behaviour was changed: same validation rules, same request, same
localStorage keys, same `isSubmitting` labels.

## Peer dependencies

```bash
npm i @mui/material @mui/icons-material @emotion/react @emotion/styled axios
npm i -D sass
```

## Colors

The SCSS module reads CSS custom properties (`--primary`, `--background`,
`--border`, `--destructive`, `--radius`, `--font-display`, ...). Define them
once in the app's global stylesheet so the whole project shares one palette.
See `login-tokens.css` for a ready-to-paste starting set.

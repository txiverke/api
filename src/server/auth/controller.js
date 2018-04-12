// @flow

import { signToken } from './index'

export default (req: Object, res: Object) => {
  const token = signToken(req.user._id)
  return res.json({ token })
}

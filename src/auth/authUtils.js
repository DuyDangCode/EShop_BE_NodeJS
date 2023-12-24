import JWT from 'jsonwebtoken';

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1 days',
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '365 days',
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`err:::CreateTokenPaidr::: ${err}`);
      } else {
        console.log('Decode:::', decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {}
};

export { createTokenPair };

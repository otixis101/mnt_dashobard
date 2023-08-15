// eslint-disable-next-line import/prefer-default-export, consistent-return
export const handleGoogleAuth = async (authToken: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authToken }),
      }
    );

    if (res && res.ok) {
      const { data: user } = await res.json();
      return user;
    }
  } catch (err) {
    return null;
  }
};

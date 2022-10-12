export const bodyValidation = (body: string): boolean => {
	const { name, pwd, word, shopId }: { name: string, pwd: string, word: string, shopId: number } = JSON.parse(body);
	return !!(name && pwd && word && [1, 2, 3, 4, 5].includes(shopId));
}

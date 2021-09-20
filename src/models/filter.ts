/**
 * Filter 형식 정의
 * 
 * Type definition of Filter
 */
export default interface Filter {
    search: string;
    category: {
      isBusiness: boolean;
      isPrivate: boolean;
    };
}

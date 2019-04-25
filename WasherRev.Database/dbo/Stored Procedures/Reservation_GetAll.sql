CREATE PROCEDURE Reservation_GetAll
AS
BEGIN
	SELECT 
	[Id],
	[UsersId],
	[StartTime],
	[EndTime],
	[WasherId],
	[IsDeleted]
	FROM [dbo].[Reservation]
	WHERE [IsDeleted] = 0
END
CREATE PROCEDURE Reservation_GetAll
AS
BEGIN
	SELECT 
	[Id],
	[UsersId],
	[StartTime],
	[EndTime],
	[WasherId]
	FROM [dbo].[Reservation]
END
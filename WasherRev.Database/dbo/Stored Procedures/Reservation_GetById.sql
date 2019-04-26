CREATE PROCEDURE Reservation_GetById(
	@Id int
)
AS
BEGIN
		SELECT 
	[Id],
	[UsersId],
	[StartTime],
	[EndTime],
	[WasherId]
	FROM [dbo].[Reservation]
	WHERE Id = @Id
END
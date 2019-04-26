CREATE PROCEDURE Reservation_Remove(
	@Id int
)
AS
BEGIN
	DELETE FROM [dbo].[Reservation]
	WHERE Id = @Id
END
CREATE PROCEDURE Reservation_Remove(
	@Id int
)
AS
BEGIN
	UPDATE [dbo].[Reservation]
	Set UsersId = null
	WHERE Id = @Id
END
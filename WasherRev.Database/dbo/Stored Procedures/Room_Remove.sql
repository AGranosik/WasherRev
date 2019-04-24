CREATE PROCEDURE Room_Remove(
	@Id int
)
AS
BEGIN
	UPDATE [dbo].[Room]
	SET IsActive = 0
	WHERE [Id] = @Id
END
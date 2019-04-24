CREATE PROCEDURE Producer_Update(
		@Id INT,
		@Name VARCHAR(MAX),
		@ServicePhoneNo VARCHAR(50)
)
AS
BEGIN
	UPDATE [dbo].[Producer]
	SET Name = ISNULL(@Name, Name),
	ServicePhoneNo = ISNULL(@ServicePhoneNo, ServicePhoneNo)
	WHERE Id = @Id
END
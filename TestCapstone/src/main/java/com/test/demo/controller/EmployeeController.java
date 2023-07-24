package com.test.demo.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.function.LongFunction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.AfterDomainEventPublication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.test.demo.dto.EmpProjDto;
import com.test.demo.dto.EmployeeDto;
import com.test.demo.dto.FeedbackDto;
import com.test.demo.dto.JobDto;
import com.test.demo.dto.NewsfeedDto;
import com.test.demo.dto.ProjectDetailsDto;
import com.test.demo.dto.ProjectDto;
import com.test.demo.email.EmailSendService;
import com.test.demo.entities.Comments;
import com.test.demo.entities.Document;
import com.test.demo.entities.Employee;
import com.test.demo.entities.EmployeeProject;
import com.test.demo.entities.Feedback;
import com.test.demo.entities.JobVacancy;
import com.test.demo.entities.NewsFeed;
import com.test.demo.entities.Owner;
import com.test.demo.entities.Policies;
import com.test.demo.entities.Project;
import com.test.demo.entities.StakeHolder;
import com.test.demo.service.EmployeeService;



@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
	
private static final org.slf4j.Logger logger=org.slf4j.LoggerFactory.getLogger(EmployeeController.class);
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private EmailSendService emailSendService;
	
	/*
	@GetMapping(value="/uploadDoc",produces = {"application/octet-stream"})
	public ResponseEntity<byte[]> download(){
		try {
			File file=ResourceUtils.getFile("classpath:test.docx");
			byte[] contents=Files.readAllBytes(Paths.get(file.getAbsolutePath()));
			org.springframework.http.HttpHeaders headers=new org.springframework.
				http.HttpHeaders();
			headers.setContentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM);
			headers.setContentDisposition(ContentDisposition.attachment().filename("yourfile.docx").build());
			return new ResponseEntity<>(contents,headers,HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			// TODO: handle exception
		}
	}*/
	
	@PostMapping("/uploadFile/{id}/{name}")
	@PreAuthorize("hasAuthority('Hr')")
	public String uploadFile(@PathVariable long id,@PathVariable String name,@RequestParam("file") MultipartFile file)
	{	Document document=employeeService.storeFile(id,name,file);
	   return document.toString();
	}
	
	@PostMapping("/uploadPolicy/{name}")
	@PreAuthorize("hasAuthority('Hr')")
	public String uploadPolicy(@PathVariable String name,@RequestParam("file") MultipartFile file)
	{	Policies py=employeeService.storefiles(name, file);
	   return py.toString();
	}
	
	
	
	
	/*@GetMapping("/{id}/documents/{docId}")
	public ResponseEntity<ByteArrayResource> downloadDoc(@PathVariable long id,@PathVariable long docId){
		Document doc=employeeService.downloadDoc(id, docId);
		org.springframework.http.HttpHeaders headers=new org.springframework.http.HttpHeaders();
		headers.setContentType(org.springframework.http.MediaType
				.parseMediaType(doc.getType()));
		headers.setContentDispositionFormData("attachment","."+employeeService.getFileExt(doc.getType()));
		return ResponseEntity.ok()
				.headers(headers)
				.body(new ByteArrayResource(doc.getData()));
	}*/
	@GetMapping("/{id}/documents/{docId}")
	public ResponseEntity<InputStreamResource> downloadDoc(@PathVariable long id,@PathVariable long docId){
		Document doc=employeeService.downloadDoc(id, docId);
		ByteArrayInputStream inputStream=new ByteArrayInputStream(doc.getData());
	    HttpHeaders headers=new HttpHeaders();
		//headers.setContentType(MediaType.APPLICATION_PDF_VALUE);
		//headers.add(HttpHeaders.CONTENT_TYPE,MediaType.APPLICATION_PDF_VALUE);
	    headers.setContentType(org.springframework.http.MediaType
				.parseMediaType(doc.getType()));
		headers.setContentDispositionFormData("attachment","."+employeeService.getFileExt(doc.getType()));
		//headers.add(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+doc.getName()+"\"");
		return ResponseEntity.ok()
				.headers(headers)
				.body(new InputStreamResource(inputStream));
	}
	
	@GetMapping("/policies/{pyId}")
	public ResponseEntity<InputStreamResource> downloadPolicy(@PathVariable long pyId){
		Policies py=employeeService.downloadPolicy(pyId);
		ByteArrayInputStream inputStream=new ByteArrayInputStream(py.getData());
	    HttpHeaders headers=new HttpHeaders();
		//headers.setContentType(MediaType.APPLICATION_PDF_VALUE);
		//headers.add(HttpHeaders.CONTENT_TYPE,MediaType.APPLICATION_PDF_VALUE);
	    headers.setContentType(org.springframework.http.MediaType
				.parseMediaType(py.getType()));
		headers.setContentDispositionFormData("attachment","."+employeeService.getFileExt(py.getType()));
		//headers.add(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+doc.getName()+"\"");
		return ResponseEntity.ok()
				.headers(headers)
				.body(new InputStreamResource(inputStream));
	}
	
	@GetMapping("/documentByEmpId/{id}")
	public List<Document> getDocByEmpId(@PathVariable("id") long id){
		return employeeService.getDocByEmpId(id);
	}
	
	@GetMapping("/getAllEmployees")
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
	
	@GetMapping("/Employee/getbyname/{name}")
	public Employee getEmployeeByName(@PathVariable String name) {
		return employeeService.getEmployeeByName(name);
	}
	
	@GetMapping("/Employee/getbyid/{id}")
	public Optional<Employee> getEmployeeByName(@PathVariable long id) {
		return employeeService.getEmployeeById(id);
	}
	
	@GetMapping("/Employee/getbystatus/{status}")
	public List<Employee> getEmployeeByStatus(@PathVariable String status){
		return employeeService.getEmployeeByStatus(status);
	}
	
	@GetMapping("/Employee/getAllManager")
	public List<Employee> getAllManagers(){
		return employeeService.getAllManager();
	}
	
	@GetMapping("/Employee/getAllHr")
	public List<Employee> getAllHrs(){
		return employeeService.getAllHr();
	}
	
	
	@PutMapping("/Employee/update/{id}")
	public Employee updateEmployee(@PathVariable("id") long id,@RequestBody EmployeeDto employeeDto) {
		return employeeService.updateEmployee(id, employeeDto);
	}
	
	@DeleteMapping("/Employee/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String  deleteByEmpId(@PathVariable("id") long id) {
		employeeService.deleteEmpById(id);
		return "Employee deleted";
	}
	
	@PostMapping("/EmpProject")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String addEmpProject(@RequestBody EmpProjDto empProjDto) {
		employeeService.addEmpProj(empProjDto);
		return "Project Added";
	}
	/*
	@PutMapping("/EmpProject/update/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public EmployeeProject updateEmpProject(@PathVariable("id") long id,@RequestBody EmpProjDto empProjDto) {
		return employeeService.updateEmpProject(id, empProjDto);
	}
	*/
	
	@DeleteMapping("/EmpProject/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String deleteByEmpProjId(@PathVariable("id") long id) {
	    employeeService.deleteByEmpProjId(id);
	    return "Employee Project Data deleted";
	}
	
	@GetMapping("/getAllEmpProjects")
	public List<EmployeeProject> getAllEmpProjects(){
		return employeeService.getAllEProjects();
	}
	
	@GetMapping("/getProjByEmp/{id}")
	public List<ProjectDetailsDto> findProjByEmpId(@PathVariable long id){
		return employeeService.getProjByEmpId(id);
	}
	
	@GetMapping("/getEmpByProjId/{id}")
	public ProjectDetailsDto getEmpByProjId(@PathVariable long id){
		return employeeService.getEmpByProjId(id);
	}
	
	@GetMapping("/getEProjectByOwnerName/{name}")
	public List<EmployeeProject> getEmpProjectByOName(@PathVariable("name") String name) {
		return employeeService.getEmpProjectByOName(name);
	}
	
	@GetMapping("/getEmpProjByEmpId/{id}")
	public List<EmployeeProject> getEmpProjByEmpId(@PathVariable long id){
		return employeeService.getByEmpId(id);
	}
	
	/*@GetMapping("/getIndividualProdetails/{id}")
	public ProjectDetailsDto getIndividualProdetails(@PathVariable("id") long id) {
		return employeeService.getIndividualProdetails(id);
	}*/
	
	@GetMapping("/getAllProjects")
	public List<Project> getAllProjects(){
		return employeeService.getAllProjects();	
	}
	
	@GetMapping("/project/getbystatus/{status}")
	public List<Project> getProjByStatus(@PathVariable String status){
		return employeeService.getProjByStatus(status);
	}
	
	@PostMapping("/project")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String addProject(@RequestBody ProjectDto projectDto){
		employeeService.addProject(projectDto);
		return "Project Added";
	}
	
	@PutMapping("/project/update/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public Project updateProject(@PathVariable("id") long id,@RequestBody ProjectDto projectDto) {
		return employeeService.updateProject(id, projectDto);
	}
	
	@DeleteMapping("/project/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String deleteProject(@PathVariable("id") long id) {
		employeeService.deleteProject(id);
		return "Project Data Deleted";
	}
	
	@GetMapping("/getAllStakeHolders")
	public List<StakeHolder> getAllStakeHolders(){
		return employeeService.getAllStakeHolders();
	}
	
	@GetMapping("/getAllOwners")
	public List<Owner> getAllOwners(){
	   return employeeService.getallOwners();
	}
	
	
	@PostMapping("/stakeholder")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String addStakeHolder(@RequestBody StakeHolder stakeHolder) {
		employeeService.addStakeHolder(stakeHolder);
		return "added";
	}
	
	@PostMapping("/owner")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String addOwner(@RequestBody Owner owner) {
		employeeService.addOwner(owner);
		return "added";
	}
	
	@PutMapping("/stakeholder/update/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public StakeHolder updateStakeHolder(@PathVariable("id") long id,@RequestBody StakeHolder stakeHolder) {
		return employeeService.updateStakeHolder(id, stakeHolder);
	}
	
	@PutMapping("/owner/update/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public Owner updateOwner(@PathVariable("id") long id,@RequestBody Owner owner) {
		return employeeService.updateOwner(id, owner);
	}
	
	@DeleteMapping("/stakeholder/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String deleteStakeHolder(@PathVariable("id") long id) {
		employeeService.deleteStakeHolder(id);
		return "StakeHolder data deleted";
	}
	
	@DeleteMapping("/owner/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Manager')")
	public String deleteOwner(@PathVariable("id") long id) {
		employeeService.deleteOwner(id);
		return "Owner data deleted";
	}
	
	@GetMapping("/getAllNewsfeed")
	public List<NewsFeed> getAllNews(){
		return employeeService.getAllNewsFeeds();
	}
	
	@GetMapping("/getAllJobs")
	public List<JobVacancy> getAllJobs(){
		return employeeService.getallJobVacancies();
	}
	
	
	@PostMapping("/Newsfeed")
	@PreAuthorize("hasAnyAuthority('Admin','Hr')")
	public String addNewsfeed(@RequestBody NewsfeedDto newsfeedDto) {
		employeeService.addNewsfeed(newsfeedDto);
		return "NewsFeed Added";
	}
	
	@PostMapping("/JobVacancy")
	@PreAuthorize("hasAnyAuthority('Admin','Hr')")
	public String addJob(@RequestBody JobDto jobDto) {
		employeeService.addJob(jobDto);
		return "Job Added";
	}
	
	@PutMapping("/Newsfeed/update/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Hr')")
	public NewsFeed updateNewsFeed(@PathVariable("id") long id,@RequestBody NewsfeedDto newsfeedDto) {
		return employeeService.updateNewsFeed(id, newsfeedDto);
	}
	
	@PutMapping("/JobVacancy/update/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Hr')")
	public JobVacancy updateJob(@PathVariable("id") long id,@RequestBody JobDto jobDto) {
		return employeeService.updateJobVacancy(id, jobDto);
	}
	
	@DeleteMapping("/newsfeed/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Hr')")
	public String deleteNewsfeed(@PathVariable("id") long id) {
		employeeService.deleteNewsfeed(id);
		return "Newsfeed Deleted";
	}
	
	@DeleteMapping("/JobVacancy/delete/{id}")
	@PreAuthorize("hasAnyAuthority('Admin','Hr')")
	public String deleteJob(@PathVariable("id") long id) {
		employeeService.deleteJob(id);
		return "Job data deleted";
	}
	
	@PostMapping("/feedback")
	public String addFeedback(@RequestBody FeedbackDto feedbackDto) {
		employeeService.addFeedback(feedbackDto);
		return "Feedback added";
	}
	
	@GetMapping("/getAllFeedback")
	public List<Feedback> getAllFeedback(){
		return employeeService.getAllFeedback();
	}
	
	
	@PostMapping("/addComment/{newsId}/{empId}/{comment}")
	public String addComment(@PathVariable long newsId,@PathVariable long empId,@PathVariable String comment) {
		employeeService.addComment(newsId,empId,comment);
		return "Comment added";
	}
	
	@GetMapping("/getComments/{newsId}")
	public List<Comments> getCommentsByNewsId(@PathVariable("newsId") long newsId){
		return employeeService.getCommentsByNewsId(newsId);
	}
}

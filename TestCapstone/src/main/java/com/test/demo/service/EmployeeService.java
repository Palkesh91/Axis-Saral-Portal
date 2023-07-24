package com.test.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.test.demo.dto.EmpProjDto;
import com.test.demo.dto.EmployeeDto;
import com.test.demo.dto.FeedbackDto;
import com.test.demo.dto.JobDto;
import com.test.demo.dto.NewsfeedDto;
import com.test.demo.dto.ProjectDetailsDto;
import com.test.demo.dto.ProjectDto;
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



@Service
public interface EmployeeService {
	
	public List<Employee> getAllEmployees();
	
	public Employee updateEmployee(long id,EmployeeDto employeeDto);
	
	public void deleteEmpById(long id);
	
	public Employee getEmployeeByName(String name);
	
	public Optional<Employee> getEmployeeById(long id);
	
	public List<Employee> getEmployeeByStatus(String status);
	
	public List<Employee> getAllManager();
	
	public List<Employee> getAllHr();
	
    public void addEmpProj(EmpProjDto empProjDto);
    
   // public EmployeeProject updateEmpProject(long id,EmpProjDto empProjDto);
    
    public void deleteByEmpProjId(long id);
	
	//public void addEmployee(Employee employee);
	
	public List<EmployeeProject> getAllEProjects();
	
	public List<EmployeeProject> getByEmpId(long id);
	
	public List<ProjectDetailsDto> getProjByEmpId(long id);
	
	public ProjectDetailsDto getEmpByProjId(long id);
	
	public List<EmployeeProject> getEmpProjectByOName(String name);
	
	//public ProjectDetailsDto getIndividualProdetails(long id);
	
	public Document storeFile(long id,String name,MultipartFile file);
	
	public Document getFile(long fileId);
	
	public Document downloadDoc(long id,long docId);
	
	public List<Document> getDocByEmpId(long id);
	
	public String getFileExt(String type);
	
	public Policies storefiles(String name,MultipartFile file);
	
	
	
	public Policies downloadPolicy(long id);
	
	public void addProject(ProjectDto projectDto);
	
	public Project updateProject(long id,ProjectDto projectDto);
	
	public void deleteProject(long id);
	
	public List<Project> getAllProjects();
	
	public List<Project> getProjByStatus(String status);
	
	public List<StakeHolder> getAllStakeHolders();
	
	public List<Owner> getallOwners();
	
    public void addStakeHolder(StakeHolder stakeHolder);
	
	public void addOwner(Owner owner);
	
	public StakeHolder updateStakeHolder(long id,StakeHolder stakeHolder);
	
	public Owner updateOwner(long id,Owner owner);
	
	public void deleteStakeHolder(long id);
	
	public void deleteOwner(long id);
	
	public List<NewsFeed> getAllNewsFeeds();
	
	public List<JobVacancy> getallJobVacancies();
	
	public void addNewsfeed(NewsfeedDto newsfeedDto);
	
	public void addJob(JobDto jobDto);
	
	public void addFeedback(FeedbackDto feedbackDto);
	
	public List<Feedback> getAllFeedback();
	
	public NewsFeed updateNewsFeed(long id,NewsfeedDto newsfeedDto);
	
	public JobVacancy updateJobVacancy(long id,JobDto jobDto);
	
	public void deleteNewsfeed(long id);
	
	public void deleteJob(long id);
	
	public Comments addComment(long newsId,long empId,String comment);
	
	public List<Comments> getCommentsByNewsId(long newsId);

}
